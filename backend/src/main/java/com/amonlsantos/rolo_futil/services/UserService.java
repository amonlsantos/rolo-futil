package com.amonlsantos.rolo_futil.services;


import com.amonlsantos.rolo_futil.domain.entities.User;

import java.util.UUID;

public interface UserService {
    User getUserById(UUID id);
}