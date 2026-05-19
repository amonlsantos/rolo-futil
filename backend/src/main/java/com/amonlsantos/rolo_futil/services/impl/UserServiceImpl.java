package com.amonlsantos.rolo_futil.services.impl;

import com.amonlsantos.rolo_futil.domain.entities.User;
import com.amonlsantos.rolo_futil.repositories.UserRepository;
import com.amonlsantos.rolo_futil.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getUserById(UUID id) {
        return userRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

}
