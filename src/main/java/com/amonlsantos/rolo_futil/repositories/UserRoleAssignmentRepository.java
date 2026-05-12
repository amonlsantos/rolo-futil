package com.amonlsantos.rolo_futil.repositories;

import com.amonlsantos.rolo_futil.domain.UserRole;
import com.amonlsantos.rolo_futil.domain.entities.UserRoleAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRoleAssignmentRepository extends JpaRepository<UserRoleAssignment, UUID> {

    List<UserRoleAssignment> findByUserId(UUID userId);

    Optional<UserRoleAssignment> findByUserIdAndRole(UUID userId, UserRole role);

    void deleteByUserIdAndRole(UUID userId, UserRole role);
}
