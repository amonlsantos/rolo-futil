package com.amonlsantos.rolo_futil.services.impl;

import com.amonlsantos.rolo_futil.domain.dtos.AuthResponse;
import com.amonlsantos.rolo_futil.domain.dtos.RegisterRequest;
import com.amonlsantos.rolo_futil.domain.entities.User;
import com.amonlsantos.rolo_futil.repositories.UserRepository;
import com.amonlsantos.rolo_futil.services.AuthenticationService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Long jwtExpirationInMilliSeconds = 864000000L;

    @Value("${jwt.secret}")
    private String secretKey;

    @Override
    public UserDetails authenticate(String email, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        return userDetailsService.loadUserByUsername(email);

    }

    @Override
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMilliSeconds))
                .signWith(getSecretKey())
                .compact();
    }

    @Override
    public UserDetails validateToken(String token) {
        String username = decodeUserName(token);
        return userDetailsService.loadUserByUsername(username);
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);

        UserDetails userDetails = authenticate(request.getEmail(), request.getPassword());
        String token = generateToken(userDetails);

        return AuthResponse.builder()
                .token(token)
                .expiresIn(jwtExpirationInMilliSeconds / 1000)
                .roles(List.of())
                .permissions(List.of())
                .build();
    }

    private String decodeUserName(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    private Key getSecretKey() {
        byte[] encoded = Base64.getEncoder().encode(secretKey.getBytes());
        return Keys.hmacShaKeyFor(encoded);
    }
}
