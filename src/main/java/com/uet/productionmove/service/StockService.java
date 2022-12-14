package com.uet.productionmove.service;

import com.uet.productionmove.entity.ProductBatch;
import com.uet.productionmove.entity.Stock;
import com.uet.productionmove.entity.StockTransaction;
import com.uet.productionmove.exception.stock.InvalidStockImportException;
import com.uet.productionmove.repository.BatchRepository;
import com.uet.productionmove.repository.StockRepository;
import com.uet.productionmove.repository.StockTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private ProductBatchService productBatchService;
    @Autowired
    public BatchRepository batchRepository;
    @Autowired
    private StockTransactionRepository stockTransactionRepository;

    public void createStockTransaction(Long productBatchId, Long importStockId) throws InvalidStockImportException {
        if (productBatchId == null || importStockId == null) {
            throw new InvalidStockImportException("Stock import is invalid");
        }

        Optional<ProductBatch> batchEntityOptional = batchRepository.findById(productBatchId);
        Optional<Stock> stockEntityOptional = stockRepository.findById(importStockId);

        if (batchEntityOptional.isPresent() && stockEntityOptional.isPresent()) {
            Stock exportStock = batchEntityOptional.get().getStock();
            StockTransaction stockTransaction = new StockTransaction(
                    batchEntityOptional.get(), exportStock, stockEntityOptional.get()
            );
            stockTransactionRepository.save(stockTransaction);
        } else throw new InvalidStockImportException("Stock import is invalid");
    }
}
