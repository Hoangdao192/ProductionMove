package com.uet.productionmove.repository;

import com.uet.productionmove.entity.WarrantyCenterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface WarrantyCenterRepository extends JpaRepository<WarrantyCenterEntity, Long> {
    Optional<WarrantyCenterEntity> findByUserId(UUID userId);
}
