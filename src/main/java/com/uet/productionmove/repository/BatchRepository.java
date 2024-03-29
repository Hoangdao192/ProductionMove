package com.uet.productionmove.repository;

import com.uet.productionmove.entity.Factory;
import com.uet.productionmove.entity.ProductBatch;
import com.uet.productionmove.entity.Stock;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchRepository extends JpaRepository<ProductBatch, Long> {
    List<ProductBatch> findAllByStockIsNull();

    List<ProductBatch> findAllByFactoryId(Long factoryId);

    List<ProductBatch> findAllByStock(Stock stock);

    List<ProductBatch> findAllByFactoryAndStockIsNull(Factory factory);


}
