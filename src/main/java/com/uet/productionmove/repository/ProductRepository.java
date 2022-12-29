package com.uet.productionmove.repository;

import com.uet.productionmove.entity.Product;
import com.uet.productionmove.entity.ProductBatch;
import com.uet.productionmove.entity.ProductLine;

import java.util.List;

import com.uet.productionmove.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByBatch(ProductBatch batch);

    List<Product> findAllByBatchAndStatus(ProductBatch productBatch, String status);

    List<Product> findAllByStock(Stock stock);

    List<Product> findAllByStockAndStatus(Stock stock, String status);
}
