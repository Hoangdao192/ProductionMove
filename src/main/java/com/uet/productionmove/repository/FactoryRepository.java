package com.uet.productionmove.repository;

import com.uet.productionmove.entity.FactoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FactoryRepository extends JpaRepository<FactoryEntity, Long> {

    Optional<FactoryEntity> findByUserId(UUID userId);
}
