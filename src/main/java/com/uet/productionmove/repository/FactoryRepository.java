package com.uet.productionmove.repository;

import com.uet.productionmove.entity.Factory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FactoryRepository extends JpaRepository<Factory, Long> {

    Optional<Factory> findByUserId(UUID userId);

    void deleteByUserId(UUID userId);
}
