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


    private ProductRepository productRepository;

    private BatchRepository batchRepository;

    private FactoryRepository factoryRepository;

    private ProductLineRepository productLineRepository;

    private StockRepository stockRepository;
    private StockService stockService;
    private ProductLineService productLineService;

    public ProductBatch createProductBatch(ProductBatchModel productBatchModel) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findById(productBatchModel.getFactoryId());
        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with ID not exists.");
        }
        Factory factory = factoryOptional.get();
        ProductLine productLine = productLineService.getProductLineById(productBatchModel.getProductLineId());

        Stock stock = null;
        if (productBatchModel.getStockId() != null) {
            stock = stockService.getStockById(productBatchModel.getStockId());
        }

        ProductBatch productBatch = new ProductBatch();
        productBatch.setProductLine(productLine);
        productBatch.setFactory(factory);
        if (stock != null) {
            productBatch.setStock(stock);
        }
        productBatch.setProductQuantity(productBatchModel.getProductQuantity());
        productBatch.setManufacturingDate(productBatchModel.getManufacturingDate());
        productBatch.setWarrantyPeriod(productBatchModel.getWarrantyPeriod());
        productBatch = batchRepository.save(productBatch);

        for (int i = 0; i < productBatch.getProductQuantity(); ++i) {
            Product product = new Product();
            product.setProductLine(productLine);
            product.setBatch(productBatch);
            if (stock != null) {
                product.setStock(stock);
            }
            product.setStatus(ProductStatus.NEWLY_PRODUCED);
            productRepository.save(product);
        }
        return productBatch;
    }

    public ProductBatch getProductBatchById(Long productBatchId) throws InvalidArgumentException {
        Optional<ProductBatch> productBatchOptional = batchRepository.findById(productBatchId);
        if (productBatchOptional.isEmpty()) {
            throw new InvalidArgumentException("Product batch with ID not exists");
        }
        return productBatchOptional.get();
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

    @Autowired
    public void setStockService(StockService stockService) {
        this.stockService = stockService;
    }

    @Autowired
    public void setProductLineService(ProductLineService productLineService) {
        this.productLineService = productLineService;
    }

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Autowired
    public void setBatchRepository(BatchRepository batchRepository) {
        this.batchRepository = batchRepository;
    }

    @Autowired
    public void setFactoryRepository(FactoryRepository factoryRepository) {
        this.factoryRepository = factoryRepository;
    }

    @Autowired
    public void setProductLineRepository(ProductLineRepository productLineRepository) {
        this.productLineRepository = productLineRepository;
    }

    @Autowired
    public void setStockRepository(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }
}
