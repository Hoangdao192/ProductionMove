package com.uet.productionmove.repository;

import com.uet.productionmove.entity.ProductBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchRepository extends JpaRepository<ProductBatch, Long> {
}
