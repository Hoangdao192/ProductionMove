package com.uet.productionmove.service;

import com.uet.productionmove.entity.ProductBatch;
import com.uet.productionmove.entity.Stock;
import com.uet.productionmove.entity.ProductBatchTransaction;
import com.uet.productionmove.entity.Unit;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.repository.BatchRepository;
import com.uet.productionmove.repository.StockRepository;
import com.uet.productionmove.repository.StockTransactionRepository;
import com.uet.productionmove.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StockService {


    private StockRepository stockRepository;
    private ProductBatchService productBatchService;
    public BatchRepository batchRepository;
    private StockTransactionRepository stockTransactionRepository;
    @Autowired
    private UnitRepository unitRepository;

    public Stock getStockByStockOwner(Unit unit) throws InvalidArgumentException {
        Optional<Stock> stockOptional = stockRepository.findByStockOwner(unit);
        if (stockOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory does not have any stock.");
        }
        return stockOptional.get();
    }

    public ProductBatchTransaction createStockTransaction(Long productBatchId, Long importStockId)
            throws InvalidArgumentException {
        if (productBatchId == null || importStockId == null) {
            throw new InvalidArgumentException("Stock import is invalid");
        }

        Optional<ProductBatch> batchEntityOptional = batchRepository.findById(productBatchId);
        Optional<Stock> stockEntityOptional = stockRepository.findById(importStockId);

        if (batchEntityOptional.isEmpty()) {
            throw new InvalidArgumentException("Product batch with ID not exists.");
        }

        if (stockEntityOptional.isEmpty()) {
            throw new InvalidArgumentException("Stock with ID not exists.");
        }

        Stock exportStock = batchEntityOptional.get().getStock();
        ProductBatchTransaction productBatchTransaction = new ProductBatchTransaction(
                    batchEntityOptional.get(), exportStock, stockEntityOptional.get()
        );

        return stockTransactionRepository.save(productBatchTransaction);
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

    @Autowired
    public void setStockTransactionRepository(
            StockTransactionRepository stockTransactionRepository) {
        this.stockTransactionRepository = stockTransactionRepository;
    }
}
