package com.uet.productionmove.repository;

import com.uet.productionmove.entity.Factory;
import com.uet.productionmove.entity.Stock;
import com.uet.productionmove.entity.Unit;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {

    Optional<Stock> findByStockOwner(Unit unit);

}
