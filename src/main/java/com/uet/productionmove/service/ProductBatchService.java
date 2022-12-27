package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.exception.productbatch.InvalidProductBatchException;
import com.uet.productionmove.model.ProductBatchModel;
import com.uet.productionmove.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductBatchService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private BatchRepository batchRepository;
    @Autowired
    private FactoryRepository factoryRepository;
    @Autowired
    private ProductLineRepository productLineRepository;
    @Autowired
    private StockRepository stockRepository;

    public ProductBatch createProductBatch(ProductBatchModel productBatchModel) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findById(productBatchModel.getFactoryId());
        Optional<ProductLine> productLineOptional = productLineRepository
                .findById(productBatchModel.getProductLineId());

        Optional<Stock> stockOptional = null;
        if (productBatchModel.getStockId() != null) {
            stockOptional = stockRepository.findById(productBatchModel.getStockId());
            if (stockOptional.isEmpty()) {
                throw new InvalidArgumentException("Stock with ID not exists.");
            }
        }

        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with ID not exists.");
        }
        if (productLineOptional.isEmpty()) {
            throw new InvalidArgumentException("ProductLine with ID not exists.");
        }

        ProductBatch productBatch = new ProductBatch();
        productBatch.setProductLine(productLineOptional.get());
        productBatch.setFactory(factoryOptional.get());
        if (stockOptional != null) {
            productBatch.setStock(stockOptional.get());
        }
        productBatch.setProductQuantity(productBatchModel.getProductQuantity());
        productBatch.setManufacturingDate(productBatchModel.getManufacturingDate());
        productBatch.setWarrantyPeriod(productBatchModel.getWarrantyPeriod());
        productBatch = batchRepository.save(productBatch);

        for (int i = 0; i < productBatch.getProductQuantity(); ++i) {
            Product product = new Product();
            product.setProductLine(productLineOptional.get());
            product.setBatch(productBatch);
            product.setStatus(ProductStatus.NEWLY_PRODUCED);
            productRepository.save(product);
        }
        return productBatch;
    }

    public List<ProductBatch> getAllProductBatchByFactoryId(Long factoryId) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findById(factoryId);
        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with ID not exists.");
        }
        return batchRepository.findAllByFactoryId(factoryId);
    }

    public List<ProductBatch> getAllProductBatchNotImported() {
        return batchRepository.findAllByStockIsNull();
    }

    public List<Product> getAllProductByProductBatchId(Long productBatchId)
            throws InvalidArgumentException {
        Optional<ProductBatch> productBatchOptional = batchRepository.findById(productBatchId);
        if (productBatchOptional.isEmpty()) {
            throw new InvalidArgumentException("Product batch with ID not exists.");
        }
        return productRepository.findByBatch(productBatchOptional.get());
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
