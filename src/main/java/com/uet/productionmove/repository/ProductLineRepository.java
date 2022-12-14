package com.uet.productionmove.repository;

import com.uet.productionmove.entity.ProductLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductLineRepository extends JpaRepository<ProductLine, Long> {
    @Override
    void deleteById(Long id);
}
