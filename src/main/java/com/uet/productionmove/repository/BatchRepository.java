package com.uet.productionmove.repository;

import com.uet.productionmove.entity.BatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchRepository extends JpaRepository<BatchEntity, Long> {
}
