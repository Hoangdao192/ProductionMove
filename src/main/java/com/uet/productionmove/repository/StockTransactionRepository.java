package com.uet.productionmove.repository;

import com.uet.productionmove.entity.ProductBatchTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockTransactionRepository extends JpaRepository<ProductBatchTransaction, Long> {
}
