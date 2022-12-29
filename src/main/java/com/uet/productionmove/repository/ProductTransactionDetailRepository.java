package com.uet.productionmove.repository;

import com.uet.productionmove.entity.ProductTransactionDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTransactionDetailRepository extends JpaRepository<ProductTransactionDetail, Long> {
}
