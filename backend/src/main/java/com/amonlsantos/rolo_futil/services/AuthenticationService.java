package com.amonlsantos.rolo_futil.services;

import com.amonlsantos.rolo_futil.domain.dtos.AuthResponse;
import com.amonlsantos.rolo_futil.domain.dtos.RegisterRequest;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthenticationService {
    UserDetails authenticate(String email, String password);
    String generateToken(UserDetails userDetails);
    UserDetails validateToken(String token);
    AuthResponse register(RegisterRequest request);
}
