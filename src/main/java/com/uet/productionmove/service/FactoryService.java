package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.*;
import com.uet.productionmove.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

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
    @Autowired
    private WarrantyCenterRepository warrantyCenterRepository;
    @Autowired
    private ProductWarrantyRepository productWarrantyRepository;
    @Autowired
    private ProductTransactionRepository transactionRepository;
    private WarrantyCenterService warrantyCenterService;

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

    public void returnErrorWarrantyFactory(Long productWarrantyId) throws InvalidArgumentException {
        ProductWarranty productWarranty = warrantyCenterService.getProductWarrantyById(productWarrantyId);
        productWarranty.setStatus(ProductWarrantyStatus.ERROR_RETURNED_WARRANTY);
        productWarrantyRepository.save(productWarranty);

        Product product = productWarranty.getCustomerProduct().getProduct();
        Factory factory = product.getBatch().getFactory();
        Stock stock = stockService.getStockByStockOwner(factory.getUnit());
        product.setStatus(ProductStatus.ERROR_RETURNED_FACTORY);
        product.setStock(stock);
        productRepository.save(product);
    }

    public List<DistributorProductTransactionModel> getAllInComingProductTransaction(Long factoryId)
            throws InvalidArgumentException {
        Factory factory = getFactoryById(factoryId);
        Stock stock = stockService.getStockByStockOwner(factory.getUnit());
        List<DistributorProductTransactionModel> transactionModels = new ArrayList<>();
        List<ProductTransaction> productTransactions = transactionRepository
                .findAllByImportStockAndTransactionStatus(stock, StockTransactionStatus.EXPORTING);
        for (int i = 0; i < productTransactions.size(); ++i) {
            ProductTransaction productTransaction = productTransactions.get(i);
            DistributorProductTransactionModel distributorTransaction = new DistributorProductTransactionModel(
                    productTransaction.getId(), productTransaction.getExportStock(),
                    productTransaction.getImportStock(), productTransaction.getTransactionStatus(),
                    productTransaction.getProductTransactionDetails()
            );
            Distributor distributor = distributorService.getDistributorByUnitId(
                    productTransaction.getExportStock().getStockOwner().getId());
            distributorTransaction.setDistributor(distributor);
            transactionModels.add(distributorTransaction);
        }
        return transactionModels;
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
        productBatch = batchRepository.save(productBatch);

        List<Product> products = productRepository.findByBatch(productBatch);
        products.forEach(product -> {
            product.setStock(stockOptional.get());
            productRepository.save(product);
        });
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

            product.setStock(null);
            product = productRepository.save(product);

            ProductTransactionDetail productTransactionDetail = new ProductTransactionDetail();
            productTransactionDetail.setProduct(product);
            productTransactionDetail.setProductTransaction(productTransaction);
            transactionDetailRepository.save(productTransactionDetail);
        }

        return productTransaction;
    }

    public void importProductTransaction(Long productTransactionId) throws InvalidArgumentException {
        Optional<ProductTransaction> productTransactionOptional =
                transactionRepository.findById(productTransactionId);
        if (productTransactionOptional.isEmpty()) {
            throw new InvalidArgumentException("ProductTransaction with ID not exists.");
        }
        ProductTransaction productTransaction = productTransactionOptional.get();
        //  Kiểm tra và cập nhập trạng thái đơn vận chuyển
        if (productTransaction.getTransactionStatus().equals(StockTransactionStatus.EXPORT_DONE)) {
            throw new InvalidArgumentException("ProductTransaction was imported.");
        }
        productTransaction.setTransactionStatus(StockTransactionStatus.EXPORT_DONE);
        productTransaction.getProductTransactionDetails().forEach(transactionDetail -> {
            //  Cập nhập trạng thái sản phẩm
            Product product = transactionDetail.getProduct();
            product.setStatus(ProductStatus.RETURNED_FACTORY);
            product.setStock(productTransaction.getImportStock());
            productRepository.save(product);
        });
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

    public List<Product> getAllExportableProductInStock(Long factoryId) throws InvalidArgumentException {
        Factory factory = getFactoryById(factoryId);
        Stock stock = stockService.getStockByStockOwner(factory.getUnit());
        return productRepository.findAllByStockAndStatus(stock, ProductStatus.NEWLY_PRODUCED);
    }

    public List<ErrorProduct> getAllErrorProductInStock(Long factoryId) throws InvalidArgumentException {
        Factory factory = getFactoryById(factoryId);
        return errorProductRepository.findAllByFactory(factory);
    }

    public Map<String, Long> getErrorProductStatisticPerLine(Long factoryId) throws InvalidArgumentException {
        Factory factory = getFactoryById(factoryId);
        Map<String, Long> data = new HashMap<>();
        List<ProductLine> productLines = productLineRepository.findAll();
        for (int i = 0; i < productLines.size(); ++i) {
            data.put(productLines.get(i).getProductName(), 0L);
        }

        List<ProductBatch> productBatches = batchRepository.findAllByFactoryId(factory.getId());
        List<Product> products = new ArrayList<>();
        for (int i = 0; i < productBatches.size(); ++i) {
            products.addAll(productRepository.findByBatch(productBatches.get(i)));
        }

        for (int i = 0; i < products.size(); ++i) {
            Product product = products.get(i);
            if (product.getStatus().equals(ProductStatus.ERROR_RETURNED_FACTORY) ||
                product.getStatus().equals(ProductStatus.ERROR_FACTORY)) {
                data.put(product.getProductLine().getProductName(),
                        data.get(product.getProductLine().getProductName()) + 1);
            }
        }

        return data;
    }

    public Map<String, Long> getErrorProductStatisticPerWarrantyCenter(Long factoryId) throws InvalidArgumentException {
        Factory factory = getFactoryById(factoryId);
        List<ErrorProduct> errorProducts = errorProductRepository.findAll();
        Map<String, Long> data = new HashMap<>();
        for (int i = 0; i < errorProducts.size(); ++i) {
            ErrorProduct errorProduct = errorProducts.get(i);
            Product product = errorProduct.getProduct();
            if (product.getBatch().getFactory().getId() == factory.getId()) {
                    Long newValue = (data.get(product.getProductLine().getProductName()) != null ?
                            data.get(product.getProductLine().getProductName()) : 0L) + 1;
                    data.put(product.getProductLine().getProductName(), newValue);
            }
        }
        return data;
    }

    public Map<String, Long> getProductStatusStatistic(Long factoryId) throws InvalidArgumentException {
        Factory factory = getFactoryById(factoryId);
        Stock stock = stockService.getStockByStockOwner(factory.getUnit());
        Map<String, Long> statistic = new HashMap<>();
        statistic.put(ProductStatus.AGENCY,
                productRepository.countAllByStatusAndStock(ProductStatus.AGENCY, stock));
        statistic.put(ProductStatus.DONE_WARRANTY,
                productRepository.countAllByStatusAndStock(ProductStatus.DONE_WARRANTY, stock));
        statistic.put(ProductStatus.ERROR_FACTORY,
                productRepository.countAllByStatusAndStock(ProductStatus.ERROR_FACTORY, stock));
        statistic.put(ProductStatus.ERROR_SUMMON,
                productRepository.countAllByStatusAndStock(ProductStatus.ERROR_SUMMON, stock));
        statistic.put(ProductStatus.ERROR_WARRANTY,
                productRepository.countAllByStatusAndStock(ProductStatus.ERROR_WARRANTY, stock));
        statistic.put(ProductStatus.ERROR_RETURNED_FACTORY,
                productRepository.countAllByStatusAndStock(ProductStatus.ERROR_RETURNED_FACTORY, stock));
        statistic.put(ProductStatus.NEWLY_PRODUCED,
                productRepository.countAllByStatusAndStock(ProductStatus.NEWLY_PRODUCED, stock));
        statistic.put(ProductStatus.SOLD,
                productRepository.countAllByStatusAndStock(ProductStatus.SOLD, stock));
        statistic.put(ProductStatus.UNDER_WARRANTY,
                productRepository.countAllByStatusAndStock(ProductStatus.UNDER_WARRANTY, stock));
        statistic.put(ProductStatus.RETURNED_FACTORY,
                productRepository.countAllByStatusAndStock(ProductStatus.RETURNED_FACTORY, stock));
        statistic.put(ProductStatus.RETURNED_WARRANTY,
                productRepository.countAllByStatusAndStock(ProductStatus.RETURNED_WARRANTY, stock));
        statistic.put(ProductStatus.WARRANTY_EXPIRED,
                productRepository.countAllByStatusAndStock(ProductStatus.WARRANTY_EXPIRED, stock));
        statistic.put(ProductStatus.CANNOT_SALE,
                productRepository.countAllByStatusAndStock(ProductStatus.CANNOT_SALE, stock));
        return statistic;
    }

    public Map<String, Long> getProductPerMonthStatistic(int year, Long factoryId) throws InvalidArgumentException {
        Factory factory = getFactoryById(factoryId);
        Map<String, Long> data = new HashMap<>();
        for (int i = 1; i <= 12; ++i) {
            data.put(String.valueOf(i), 0L);
        }
        List<ProductBatch> productBatches = batchRepository.findAllByFactoryId(factory.getId());
        for (int i = 0; i < productBatches.size(); ++i) {
            ProductBatch productBatch = productBatches.get(i);
            LocalDate date = productBatch.getManufacturingDate();
            if (date.getYear() == year) {
                data.put(String.valueOf(date.getMonthValue()),
                        data.get(String.valueOf(date.getMonthValue())) + productBatch.getProductQuantity());
            }
        }
        return data;
    }

    public Map<String, Long> getProductPerQuarterStatistic(int year, Long factoryId) throws InvalidArgumentException {
        Factory factory = getFactoryById(factoryId);
        Map<String, Long> data = new HashMap<>();
        for (int i = 1; i <= 4; ++i) {
            data.put(String.valueOf(i), 0L);
        }
        List<ProductBatch> productBatches = batchRepository.findAllByFactoryId(factory.getId());
        for (int i = 0; i < productBatches.size(); ++i) {
            ProductBatch productBatch = productBatches.get(i);
            LocalDate date = productBatch.getManufacturingDate();
            if (date.getYear() == year) {
                if (date.getMonthValue() <= 3) {
                    data.put("1", data.get("1") + productBatch.getProductQuantity());
                }
                if (date.getMonthValue() >= 4 && date.getMonthValue() <= 6) {
                    data.put("2", data.get("2") + productBatch.getProductQuantity());
                }
                if (date.getMonthValue() >= 7 && date.getMonthValue() <= 9) {
                    data.put("3", data.get("3") + productBatch.getProductQuantity());
                }
                if (date.getMonthValue() >= 10) {
                    data.put("4", data.get("4") + productBatch.getProductQuantity());
                }
            }
        }
        return data;
    }

    public Map<String, Long> getProductPerYearStatistic(Long factoryId) throws InvalidArgumentException {
        int currentYear = LocalDate.now().getYear();

        Factory factory = getFactoryById(factoryId);
        Map<String, Long> data = new HashMap<>();
        for (int i = currentYear - 2; i <= currentYear + 2; ++i) {
            data.put(String.valueOf(i), 0L);
        }
        List<ProductBatch> productBatches = batchRepository.findAllByFactoryId(factory.getId());
        for (int i = 0; i < productBatches.size(); ++i) {
            ProductBatch productBatch = productBatches.get(i);
            LocalDate date = productBatch.getManufacturingDate();
            if (date.getYear() >= currentYear - 2 && date.getYear() <= currentYear + 2) {
                data.put(String.valueOf(date.getYear()),
                        data.get(String.valueOf(date.getYear())) + productBatch.getProductQuantity());
            }
        }
        return data;
    }

    public Map<String, Long> getProductPerFactoryStatistic() {
        Map<String, Long> data = new HashMap<>();
        List<Factory> factories = factoryRepository.findAll();
        for (int i = 0; i < factories.size(); ++i) {
            Factory factory = factories.get(i);
            List<ProductBatch> productBatches = batchRepository.findAllByFactoryId(factory.getId());
            long totalProduct = 0L;
            for (int j = 0; j < productBatches.size(); ++j) {
                totalProduct += productRepository.countAllByBatch(productBatches.get(j));
            }
            data.put(factory.getName(), totalProduct);
        }
        return data;
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

    @Autowired
    public void setWarrantyCenterService(WarrantyCenterService warrantyCenterService) {
        this.warrantyCenterService = warrantyCenterService;
    }
}
