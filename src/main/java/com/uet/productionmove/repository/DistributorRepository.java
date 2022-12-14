package com.uet.productionmove.repository;

import com.uet.productionmove.entity.Distributor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DistributorRepository extends JpaRepository<Distributor, Long> {
    Optional<Distributor> findByUserId(UUID userId);

    void deleteByUserId(UUID userId);
}
