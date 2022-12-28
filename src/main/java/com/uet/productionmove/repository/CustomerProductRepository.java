package com.uet.productionmove.repository;

import com.uet.productionmove.entity.CustomerProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerProductRepository extends JpaRepository<CustomerProduct, Long> {
    Optional<CustomerProduct> findByProductId(Long productId);
}
