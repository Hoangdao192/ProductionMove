package com.uet.productionmove.repository;

import com.uet.productionmove.entity.Factory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FactoryRepository extends JpaRepository<Factory, Long> {

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM factory WHERE id = ?1", nativeQuery = true)
    void deleteById(Long factoryId);

    Optional<Factory> findByUnitId(Long unitId);

}
