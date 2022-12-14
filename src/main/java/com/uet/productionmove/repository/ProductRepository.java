package com.uet.productionmove.repository;

import com.uet.productionmove.entity.ProductLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductLine, Long> {
}
