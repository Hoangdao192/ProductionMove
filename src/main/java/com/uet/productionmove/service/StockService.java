package com.uet.productionmove.service;

import com.uet.productionmove.entity.ProductBatch;
import com.uet.productionmove.entity.Stock;
import com.uet.productionmove.entity.Unit;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.repository.BatchRepository;
import com.uet.productionmove.repository.StockRepository;
import com.uet.productionmove.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StockService {


    private StockRepository stockRepository;
    private ProductBatchService productBatchService;
    public BatchRepository batchRepository;
    @Autowired
    private UnitRepository unitRepository;

    public Stock getStockByStockOwner(Unit unit) throws InvalidArgumentException {
        Optional<Stock> stockOptional = stockRepository.findByStockOwner(unit);
        if (stockOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory does not have any stock.");
        }
        return stockOptional.get();
    }

    public Stock getStockById(Long stockId) throws InvalidArgumentException {
        Optional<Stock> stockOptional = stockRepository.findById(stockId);
        if (stockOptional.isEmpty()) {
            throw new InvalidArgumentException("Stock with ID not exists.");
        }
        return stockOptional.get();
    }

    public Stock getStockByOwnerId(Long unitId) throws InvalidArgumentException {
        Optional<Unit> unitOptional = unitRepository.findById(unitId);
        if (unitOptional.isEmpty()) {
            throw new InvalidArgumentException("Unit with Id not exists.");
        }
        return getStockByStockOwner(unitOptional.get());
    }

    @Autowired
    public void setStockRepository(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @Autowired
    public void setProductBatchService(ProductBatchService productBatchService) {
        this.productBatchService = productBatchService;
    }

    @Autowired
    public void setBatchRepository(BatchRepository batchRepository) {
        this.batchRepository = batchRepository;
    }

}
