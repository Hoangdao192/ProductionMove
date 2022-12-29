package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.FactoryExportModel;
import com.uet.productionmove.model.FactoryExportProductModel;
import com.uet.productionmove.model.FactoryModel;
import com.uet.productionmove.model.ProductTransactionModel;
import com.uet.productionmove.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FactoryService {

    private ProductLineRepository productLineRepository;
    private BatchRepository batchRepository;
    private FactoryRepository factoryRepository;
    @Autowired
    private DistributorRepository distributorRepository;
    @Autowired
    private ProductTransactionDetailRepository transactionDetailRepository;

    private StockRepository stockRepository;

    private UnitRepository unitRepository;

    private StockTransactionRepository stockTransactionRepository;

    private ProductRepository productRepository;

    private ErrorProductRepository errorProductRepository;
    private DistributorService distributorService;
    private StockService stockService;
    private ProductBatchService productBatchService;
    @Autowired
    private ProductTransactionRepository productTransactionRepository;
    private ProductService productService;

    public Factory createFactory(FactoryModel factoryModel) throws InvalidArgumentException {
        Unit unit = new Unit();
        unit.setType(UserType.MANUFACTURE);
        unit = unitRepository.save(unit);

        Factory factory = new Factory(
                unit,
                factoryModel.getName(),
                factoryModel.getPhoneNumber(),
                factoryModel.getAddress());
        factory = factoryRepository.save(factory);
        createFactoryStock(factory);
        return factory;
    }

    private Stock createFactoryStock(Factory factory) {
        Stock stock = new Stock();
        stock.setStockOwner(factory.getUnit());
        stock.setName(factory.getName());
        stock.setAddress(factory.getAddress());
        stock = stockRepository.save(stock);
        return stock;
    }

    public Factory updateFactory(FactoryModel factoryModel) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findById(factoryModel.getId());

        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with ID not exists.");
        }

        Factory factory = factoryOptional.get();
        factory.setName(factoryModel.getName());
        factory.setAddress(factoryModel.getAddress());
        factory.setPhoneNumber(factoryModel.getPhoneNumber());
        return factoryRepository.save(factory);
    }

    public Factory getFactoryById(Long factoryId) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findById(factoryId);
        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with ID not exists");
        }
        return factoryOptional.get();
    }

    public Factory getFactoryByUnitId(Long unitId) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findByUnitId(unitId);
        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with Unit ID not exists.");
        }
        return factoryOptional.get();
    }

    public void deleteFactoryById(Long factoryId) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findById(factoryId);
        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with ID not exists.");
        }
        factoryRepository.deleteById(factoryId);
    }

    public List<FactoryModel> getAllFactory() {
        List<FactoryModel> factoryModels = new ArrayList<>();
        factoryRepository.findAll().forEach(factory -> {
            FactoryModel factoryModel = new FactoryModel();
            factoryModel.setId(factory.getId());
            factoryModel.setUnitId(factory.getUnit().getId());
            factoryModel.setName(factory.getName());
            factoryModel.setAddress(factory.getAddress());
            factoryModel.setPhoneNumber(factory.getPhoneNumber());
            factoryModels.add(factoryModel);
        });
        return factoryModels;
    }

    public void importProducedBatchIntoStock(Long factoryId, Long batchId) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findById(factoryId);
        Optional<ProductBatch> productBatchOptional = batchRepository.findById(batchId);
        Optional<Stock> stockOptional = stockRepository.findByStockOwner(factoryOptional.get().getUnit());

        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with ID not exists.");
        }
        if (productBatchOptional.isEmpty()) {
            throw new InvalidArgumentException("Batch with ID not exists.");
        }
        if (stockOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory does not have stock.");
        }

        ProductBatch productBatch = productBatchOptional.get();
        productBatch.setStock(stockOptional.get());
        batchRepository.save(productBatch);
    }

    /**
     * Cơ sở sản xuất xuất lô hàng cho đại lý
     */
    public ProductTransaction exportBatchToDistributor(FactoryExportModel factoryExportModel)
            throws InvalidArgumentException {
        Factory factory = getFactoryById(factoryExportModel.getFactoryId());
        Distributor distributor =
                distributorService.getDistributorById(factoryExportModel.getDistributorId());

        Stock factoryStock = stockService.getStockByStockOwner(factory.getUnit());
        Stock distributorStock = stockService.getStockByStockOwner(distributor.getUnit());

        ProductTransaction productTransaction = new ProductTransaction();
        productTransaction.setExportStock(factoryStock);
        productTransaction.setImportStock(distributorStock);
        productTransaction.setTransactionStatus(StockTransactionStatus.EXPORTING);
        productTransaction = productTransactionRepository.save(productTransaction);

        for (int i = 0; i < factoryExportModel.getExportBatchIds().size(); ++i) {
            Long batchId = factoryExportModel.getExportBatchIds().get(i);
            ProductBatch productBatch = productBatchService.getProductBatchById(batchId);

            if (productBatch.getStock() == null) {
                throw new InvalidArgumentException("Product batch does not in any stock.");
            }
            if (productBatch.getStock().getId() != factoryStock.getId()) {
                throw new InvalidArgumentException("Product batch does not in Factory's stock.");
            }

            // Thay đổi trạng thái của các sản phẩm trong lô hàng thành "Đã được đưa về đại lý"
            List<Product> products = productRepository.findByBatch(productBatch);
            for (int j = 0; j < products.size(); ++j) {
                Product product = products.get(j);
                product.setStatus(ProductStatus.AGENCY);
                product.setStock(distributorStock);
                productRepository.save(product);

                ProductTransactionDetail productTransactionDetail = new ProductTransactionDetail();
                productTransactionDetail.setProductTransaction(productTransaction);
                productTransactionDetail.setProduct(product);
                transactionDetailRepository.save(productTransactionDetail);
            }

            productBatch.setStock(distributorStock);
            productBatch = batchRepository.save(productBatch);
        }
        return productTransaction;
    }

    /**
     * Cơ sở sản xuất xuất sản phẩm sang đại lý
     */
    public ProductTransaction exportProductsToDistributor(
            FactoryExportProductModel factoryExportProductModel)
            throws InvalidArgumentException {
        Factory factory = getFactoryById(factoryExportProductModel.getFactoryId());
        Distributor distributor =
                distributorService.getDistributorById(factoryExportProductModel.getDistributorId());

        Stock importStock = stockService.getStockByStockOwner(distributor.getUnit());
        Stock exportStock = stockService.getStockByStockOwner(factory.getUnit());

        ProductTransaction productTransaction = new ProductTransaction();
        productTransaction.setImportStock(importStock);
        productTransaction.setExportStock(exportStock);
        productTransaction.setTransactionStatus(StockTransactionStatus.EXPORTING);
        productTransaction = productTransactionRepository.save(productTransaction);

        List<Long> productIds = factoryExportProductModel.getProductIds();
        for (int i = 0; i < productIds.size(); ++i) {
            Product product = productService.getProductById(productIds.get(i));
            if (product.getStock().getId() != exportStock.getId()) {
                throw new InvalidArgumentException("Sản phẩm không nằm trong kho.");
            }

            ProductTransactionDetail productTransactionDetail = new ProductTransactionDetail();
            productTransactionDetail.setProduct(product);
            productTransactionDetail.setProductTransaction(productTransaction);
            transactionDetailRepository.save(productTransactionDetail);
        }

        return productTransaction;
    }

    public List<ProductBatch> getAllProductBatchInStock(Long factoryId) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findById(factoryId);
        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with ID not exists.");
        }
        Optional<Stock> stockOptional = stockRepository.findByStockOwner(factoryOptional.get().getUnit());
        if (stockOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory does not have any Stock.");
        }

        return batchRepository.findAllByStock(stockOptional.get());
    }

    public List<ProductBatch> getAllProductBatchNotImport(Long factoryId) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findById(factoryId);
        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with ID not exists.");
        }
        Optional<Stock> stockOptional = stockRepository.findByStockOwner(factoryOptional.get().getUnit());
        if (stockOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory does not have any Stock.");
        }
        return batchRepository.findAllByFactoryAndStockIsNull(factoryOptional.get());
    }

    public List<Product> getAllProductInStock(Long factoryId) throws InvalidArgumentException {
        Factory factory = getFactoryById(factoryId);
        Stock stock = stockService.getStockByStockOwner(factory.getUnit());
        return productRepository.findAllByStock(stock);
    }

    public List<ErrorProduct> getAllErrorProductInStock(Long factoryId) throws InvalidArgumentException {
        Factory factory = getFactoryById(factoryId);
        return errorProductRepository.findAllByFactory(factory);
    }

    @Autowired
    public void setProductLineRepository(ProductLineRepository productLineRepository) {
        this.productLineRepository = productLineRepository;
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
    public void setStockService(StockService stockService) {
        this.stockService = stockService;
    }

    @Autowired
    public void setProductBatchService(ProductBatchService productBatchService) {
        this.productBatchService = productBatchService;
    }

    @Autowired
    public void setDistributorService(DistributorService distributorService) {
        this.distributorService = distributorService;
    }

    @Autowired
    public void setDistributorRepository(DistributorRepository distributorRepository) {
        this.distributorRepository = distributorRepository;
    }

    @Autowired
    public void setStockRepository(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @Autowired
    public void setUnitRepository(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    @Autowired
    public void setStockTransactionRepository(StockTransactionRepository stockTransactionRepository) {
        this.stockTransactionRepository = stockTransactionRepository;
    }

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Autowired
    public void setErrorProductRepository(ErrorProductRepository errorProductRepository) {
        this.errorProductRepository = errorProductRepository;
    }

    @Autowired
    public void setProductService(ProductService productService) {
        this.productService = productService;
    }
}
