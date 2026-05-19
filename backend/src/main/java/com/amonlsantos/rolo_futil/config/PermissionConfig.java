package com.amonlsantos.rolo_futil.config;

import com.amonlsantos.rolo_futil.domain.Permission;
import com.amonlsantos.rolo_futil.domain.UserRole;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

import static com.amonlsantos.rolo_futil.domain.Permission.*;
import static com.amonlsantos.rolo_futil.domain.UserRole.*;

public class PermissionConfig {

    private static final Map<UserRole, List<Permission>> ROLE_PERMISSIONS = new EnumMap<>(UserRole.class);

    static {
        ROLE_PERMISSIONS.put(WRITER, List.of(
                POST_CREATE,
                POST_EDIT_OWN,
                POST_VIEW_DRAFTS
        ));

        ROLE_PERMISSIONS.put(EDITOR, List.of(
                POST_CREATE,
                POST_EDIT_OWN,
                POST_EDIT_ANY,
                POST_VIEW_DRAFTS,
                POST_PUBLISH,
                POST_DELETE
        ));

        ROLE_PERMISSIONS.put(ADMIN, List.of(
                POST_CREATE,
                POST_EDIT_OWN,
                POST_EDIT_ANY,
                POST_VIEW_DRAFTS,
                POST_PUBLISH,
                POST_DELETE,
                USER_ROLE_MANAGE
        ));
    }

    public static List<Permission> getPermissions(UserRole role) {
        return ROLE_PERMISSIONS.getOrDefault(role, List.of());
    }
}
