package com.uet.productionmove.repository;

import com.uet.productionmove.entity.ProductTransaction;
import com.uet.productionmove.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductTransactionRepository extends JpaRepository<ProductTransaction, Long> {
    List<ProductTransaction> findAllByImportStockAndTransactionStatus(Stock stock, String status);
}
