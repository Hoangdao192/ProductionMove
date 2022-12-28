package com.uet.productionmove.repository;

import com.uet.productionmove.entity.WarrantyCenter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface WarrantyCenterRepository extends JpaRepository<WarrantyCenter, Long> {
    Optional<WarrantyCenter> findByUnitId(Long unitId);
}
