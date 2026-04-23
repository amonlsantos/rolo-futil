package com.amonlsantos.rolo_futil.controllers;

import com.amonlsantos.rolo_futil.domain.dtos.AuthResponse;
import com.amonlsantos.rolo_futil.domain.dtos.LoginRequest;
import com.amonlsantos.rolo_futil.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        UserDetails userDetails = authenticationService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        String tokenValue = authenticationService.generateToken(userDetails);
        long A_DAY_IN_SECONDS = 86400;
        AuthResponse authResponse = AuthResponse.builder()
                .token(tokenValue)
                .expiresIn(A_DAY_IN_SECONDS)
                .build();

        return ResponseEntity.ok(authResponse);
    }
}
