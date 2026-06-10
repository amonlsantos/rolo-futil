package com.amonlsantos.rolo_futil.domain.dtos;

import com.amonlsantos.rolo_futil.domain.Permission;
import com.amonlsantos.rolo_futil.domain.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    private long expiresIn;
    private List<UserRole> roles;
    private List<Permission> permissions;
}
