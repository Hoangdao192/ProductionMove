package com.uet.productionmove.service;

import com.uet.productionmove.entity.ProductBatch;
import com.uet.productionmove.entity.Factory;
import com.uet.productionmove.entity.ProductLine;
import com.uet.productionmove.exception.productbatch.InvalidProductBatchException;
import com.uet.productionmove.model.ProductBatchModel;
import com.uet.productionmove.repository.BatchRepository;
import com.uet.productionmove.repository.FactoryRepository;
import com.uet.productionmove.repository.ProductLineRepository;
import com.uet.productionmove.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductBatchService {

    @Autowired
    private BatchRepository batchRepository;
    @Autowired
    private FactoryRepository factoryRepository;
    @Autowired
    private ProductLineRepository productLineRepository;
    @Autowired
    private StockRepository stockRepository;

    public void createProductBatch(ProductBatch productBatch) throws InvalidProductBatchException {
        if (isProductBatchValid(productBatch)) {
            batchRepository.save(productBatch);
        } else
            throw new InvalidProductBatchException("Product batch is not valid");
    }

    public void insertProductBatch(ProductBatchModel productBatchModel) {
        Optional<Factory> factoryEntity = factoryRepository.findById(productBatchModel.getFactoryId());
        Optional<ProductLine> productLine = productLineRepository.findById(productBatchModel.getProductLineId());
        if (factoryEntity.isPresent() && productLine.isPresent()) {
            ProductBatch batch = new ProductBatch(
                    null, productBatchModel.getManufacturingDate(),
                    factoryEntity.get(), productLine.get());
            batchRepository.save(batch);
        }
    }

    public void deleteProductBatch(Long productBatchId) {
        batchRepository.deleteById(productBatchId);
    }

    public boolean isProductBatchValid(ProductBatch productBatch) {
        return factoryRepository.existsById(productBatch.getFactory().getId())
                && productLineRepository.existsById(productBatch.getProductLine().getId())
                && stockRepository.existsById(productBatch.getStock().getId());
    }

}
