package com.amonlsantos.rolo_futil.services;

import com.amonlsantos.rolo_futil.domain.Permission;
import com.amonlsantos.rolo_futil.domain.UserRole;

import java.util.List;
import java.util.UUID;

public interface AuthorizationService {

    List<UserRole> getUserRoles(UUID userId);

    boolean hasPermission(UUID userId, Permission permission);

    boolean hasRole(UUID userId, UserRole role);

    void checkPermission(UUID userId, Permission permission);
}
