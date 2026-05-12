package com.amonlsantos.rolo_futil.services.impl;

import com.amonlsantos.rolo_futil.config.PermissionConfig;
import com.amonlsantos.rolo_futil.domain.Permission;
import com.amonlsantos.rolo_futil.domain.UserRole;
import com.amonlsantos.rolo_futil.domain.entities.UserRoleAssignment;
import com.amonlsantos.rolo_futil.repositories.UserRoleAssignmentRepository;
import com.amonlsantos.rolo_futil.services.AuthorizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {

    private final UserRoleAssignmentRepository userRoleAssignmentRepository;

    @Override
    public List<UserRole> getUserRoles(UUID userId) {
        return userRoleAssignmentRepository.findByUserId(userId)
                .stream()
                .map(UserRoleAssignment::getRole)
                .toList();
    }

    @Override
    public boolean hasPermission(UUID userId, Permission permission) {
        Set<Permission> userPermissions = getUserRoles(userId).stream()
                .flatMap(role -> PermissionConfig.getPermissions(role).stream())
                .collect(Collectors.toSet());

        return userPermissions.contains(permission);
    }

    @Override
    public boolean hasRole(UUID userId, UserRole role) {
        return getUserRoles(userId).contains(role);
    }

    @Override
    public void checkPermission(UUID userId, Permission permission) {
        if (!hasPermission(userId, permission)) {
            throw new SecurityException(
                    "User " + userId + " does not have permission: " + permission
            );
        }
    }
}
