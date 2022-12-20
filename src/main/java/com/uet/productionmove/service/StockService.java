package com.uet.productionmove.service;

import com.uet.productionmove.entity.ProductBatch;
import com.uet.productionmove.entity.Stock;
import com.uet.productionmove.entity.StockTransaction;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.exception.stock.InvalidStockImportException;
import com.uet.productionmove.repository.BatchRepository;
import com.uet.productionmove.repository.StockRepository;
import com.uet.productionmove.repository.StockTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StockService {


    private StockRepository stockRepository;
    private ProductBatchService productBatchService;
    public BatchRepository batchRepository;
    private StockTransactionRepository stockTransactionRepository;

    public StockTransaction createStockTransaction(Long productBatchId, Long importStockId)
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
        StockTransaction stockTransaction = new StockTransaction(
                    batchEntityOptional.get(), exportStock, stockEntityOptional.get()
        );

        return stockTransactionRepository.save(stockTransaction);
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
