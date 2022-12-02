package com.uet.productionmove.repository;

import com.uet.productionmove.entity.ProductLineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductLineRepository extends JpaRepository<ProductLineEntity, Long> {
    @Override
    void deleteById(Long id);
}
