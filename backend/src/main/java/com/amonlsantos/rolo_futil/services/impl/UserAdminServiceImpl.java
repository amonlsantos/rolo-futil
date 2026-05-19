package com.amonlsantos.rolo_futil.services.impl;

import com.amonlsantos.rolo_futil.domain.UserRole;
import com.amonlsantos.rolo_futil.domain.entities.UserRoleAssignment;
import com.amonlsantos.rolo_futil.repositories.UserRoleAssignmentRepository;
import com.amonlsantos.rolo_futil.services.AuthorizationService;
import com.amonlsantos.rolo_futil.services.UserAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static com.amonlsantos.rolo_futil.domain.Permission.USER_ROLE_MANAGE;

@Service
@RequiredArgsConstructor
public class UserAdminServiceImpl implements UserAdminService {

    private final UserRoleAssignmentRepository userRoleAssignmentRepository;
    private final AuthorizationService authorizationService;

    @Override
    @Transactional
    public UserRoleAssignment assignRole(UUID adminUserId, UUID targetUserId, UserRole role) {
        authorizationService.checkPermission(adminUserId, USER_ROLE_MANAGE);

        boolean alreadyAssigned = userRoleAssignmentRepository
                .findByUserIdAndRole(targetUserId, role)
                .isPresent();

        if (alreadyAssigned) {
            throw new IllegalArgumentException(
                    "User " + targetUserId + " already has role: " + role
            );
        }

        UserRoleAssignment assignment = UserRoleAssignment.builder()
                .userId(targetUserId)
                .role(role)
                .build();

        return userRoleAssignmentRepository.save(assignment);
    }

    @Override
    @Transactional
    public void removeRole(UUID adminUserId, UUID targetUserId, UserRole role) {
        authorizationService.checkPermission(adminUserId, USER_ROLE_MANAGE);

        UserRoleAssignment assignment = userRoleAssignmentRepository
                .findByUserIdAndRole(targetUserId, role)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User " + targetUserId + " does not have role: " + role
                ));

        userRoleAssignmentRepository.delete(assignment);
    }

    @Override
    public List<UserRoleAssignment> getUserRoles(UUID adminUserId, UUID targetUserId) {
        authorizationService.checkPermission(adminUserId, USER_ROLE_MANAGE);
        return userRoleAssignmentRepository.findByUserId(targetUserId);
    }
}
