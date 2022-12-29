package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.FactoryExportModel;
import com.uet.productionmove.model.FactoryModel;
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
    private StockRepository stockRepository;
    @Autowired
    private UnitRepository unitRepository;
    @Autowired
    private StockTransactionRepository stockTransactionRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ErrorProductRepository errorProductRepository;
    @Autowired
    private DistributorService distributorService;
    @Autowired
    private StockService stockService;
    @Autowired
    private ProductBatchService productBatchService;

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
     * Cơ sở sản xuất xuất hàng cho đại lý
     */
    public void exportBatchToDistributor(FactoryExportModel factoryExportModel)
            throws InvalidArgumentException {
        Factory factory = getFactoryById(factoryExportModel.getFactoryId());
        Distributor distributor =
                distributorService.getDistributorById(factoryExportModel.getDistributorId());

        Stock factoryStock = stockService.getStockByStockOwner(factory.getUnit());
        Stock distributorStock = stockService.getStockByStockOwner(distributor.getUnit());

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
            products.forEach((product) -> {
                product.setStatus(ProductStatus.AGENCY);
                product.setStock(distributorStock);
                productRepository.save(product);
            });

            productBatch.setStock(distributorStock);
            productBatch = batchRepository.save(productBatch);
            ProductBatchTransaction productBatchTransaction = new ProductBatchTransaction();
            productBatchTransaction.setBatch(productBatch);
            productBatchTransaction.setExportStock(factoryStock);
            productBatchTransaction.setImportStock(distributorStock);
            productBatchTransaction.setTransactionStatus(StockTransactionStatus.EXPORTING);
            stockTransactionRepository.save(productBatchTransaction);
        }
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
        List<ProductBatch> productBatches = getAllProductBatchInStock(factoryId);
        List<Product> products = new ArrayList<>();
        productBatches.forEach(productBatch -> {
            products.addAll(productRepository.findByBatch(productBatch));
        });
        return products;
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
}
