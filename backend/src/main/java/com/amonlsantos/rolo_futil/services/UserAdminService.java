package com.amonlsantos.rolo_futil.services;

import com.amonlsantos.rolo_futil.domain.UserRole;
import com.amonlsantos.rolo_futil.domain.entities.UserRoleAssignment;

import java.util.List;
import java.util.UUID;

public interface UserAdminService {

    UserRoleAssignment assignRole(UUID adminUserId, UUID targetUserId, UserRole role);

    void removeRole(UUID adminUserId, UUID targetUserId, UserRole role);

    List<UserRoleAssignment> getUserRoles(UUID adminUserId, UUID targetUserId);
}
