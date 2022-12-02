package com.uet.productionmove.repository;

import com.uet.productionmove.entity.DistributorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DistributorRepository extends JpaRepository<DistributorEntity, Long> {
    Optional<DistributorEntity> findByUserId(UUID userId);
}
