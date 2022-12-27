package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.FactoryExportModel;
import com.uet.productionmove.model.FactoryModel;
import com.uet.productionmove.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.StackWalker.Option;
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
    private UserRepository userRepository;
    @Autowired
    private UnitRepository unitRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private StockTransactionRepository stockTransactionRepository;

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

    public void exportBatchToDistributor(FactoryExportModel factoryExportModel) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findById(factoryExportModel.getFactoryId());
        Optional<Distributor> distributorOptional = distributorRepository
                .findById(factoryExportModel.getDistributorId());

        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with ID not exists");
        }
        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with ID not exists");
        }

        Optional<Stock> factoryStockOptional = stockRepository.findByStockOwner(factoryOptional.get().getUnit());
        if (factoryStockOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory does not have any stock.");
        }

        Optional<Stock> distributorStockOptional = stockRepository
                .findByStockOwner(distributorOptional.get().getUnit());
        if (distributorStockOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor does not have any stock.");
        }

        for (int i = 0; i < factoryExportModel.getExportBatchIds().size(); ++i) {
            Long batchId = factoryExportModel.getExportBatchIds().get(i);
            Optional<ProductBatch> productBatchOptional = batchRepository.findById(batchId);
            if (productBatchOptional.isEmpty()) {
                throw new InvalidArgumentException("Product batch with ID not exists");
            }
            ProductBatch productBatch = productBatchOptional.get();
            if (productBatch.getStock() == null) {
                throw new InvalidArgumentException("Product batch does not in any stock.");
            }
            if (productBatch.getStock().getId() != factoryStockOptional.get().getId()) {
                throw new InvalidArgumentException("Product batch does not in Factory's stock.");
            }

            productBatch.setStock(distributorStockOptional.get());
            productBatch = batchRepository.save(productBatch);
            StockTransaction stockTransaction = new StockTransaction();
            stockTransaction.setBatch(productBatch);
            stockTransaction.setExportStock(factoryStockOptional.get());
            stockTransaction.setImportStock(distributorStockOptional.get());
            stockTransaction.setTransactionStatus(StockTransactionStatus.EXPORTING);
            stockTransactionRepository.save(stockTransaction);
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
