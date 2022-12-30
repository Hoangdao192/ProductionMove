package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.*;
import com.uet.productionmove.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.StackWalker.Option;
import java.time.LocalDate;
import java.util.*;

@Service
public class DistributorService {

    private DistributorRepository distributorRepository;
    @Autowired
    private UnitRepository unitRepository;
    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private BatchRepository batchRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderService orderService;
    @Autowired
    private CustomerProductRepository customerProductRepository;
    @Autowired
    private ProductWarrantyRepository productWarrantyRepository;
    @Autowired
    private WarrantyCenterRepository warrantyCenterRepository;
    @Autowired
    private ProductLineService productLineService;
    private StockService stockService;
    @Autowired
    private ProductTransactionRepository transactionRepository;
    @Autowired
    private ProductTransactionDetailRepository transactionDetailRepository;
    private FactoryService factoryService;
    private ProductService productService;

    public Distributor createDistributor(DistributorModel distributorModel)
            throws InvalidArgumentException {

        Unit unit = new Unit();
        unit.setType(UserType.DISTRIBUTOR);
        unit = unitRepository.save(unit);

        Distributor distributor = new Distributor(
                unit,
                distributorModel.getName(),
                distributorModel.getAddress(),
                distributorModel.getPhoneNumber());

        distributor = distributorRepository.save(distributor);
        createDistributorStock(distributor);
        return distributor;
    }

    private Stock createDistributorStock(Distributor distributor) {
        Stock stock = new Stock();
        stock.setStockOwner(distributor.getUnit());
        stock.setName(distributor.getName());
        stock.setAddress(distributor.getAddress());
        stock = stockRepository.save(stock);
        return stock;
    }

    public Distributor updateDistributor(DistributorModel distributorModel)
            throws InvalidArgumentException {
        Optional<Distributor> distributorOptional = distributorRepository.findById(distributorModel.getId());

        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with ID not exists");
        }

        Distributor distributor = distributorOptional.get();
        distributor.setName(distributorModel.getName());
        distributor.setAddress(distributorModel.getAddress());
        distributor.setPhoneNumber(distributorModel.getPhoneNumber());
        return distributorRepository.save(distributor);
    }

    public Distributor getDistributorByUnitId(Long unitId) throws InvalidArgumentException {
        Optional<Distributor> distributorOptional = distributorRepository.findByUnitId(unitId);
        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with Unit ID not exists.");
        }
        return distributorOptional.get();
    }

    public List<DistributorModel> getAllDistributor() {
        List<Distributor> distributors = distributorRepository.findAll();
        List<DistributorModel> distributorModels = new ArrayList<>();
        distributors.forEach(distributor -> {
            DistributorModel distributorModel = new DistributorModel();
            distributorModel.setId(distributor.getId());
            distributorModel.setUnitId(distributor.getUnit().getId());
            distributorModel.setName(distributor.getName());
            distributorModel.setAddress(distributor.getAddress());
            distributorModel.setPhoneNumber(distributor.getPhoneNumber());
            distributorModels.add(distributorModel);
        });
        return distributorModels;
    }

    public List<ProductBatch> getAllProductBatchInStock(Long distributorId) throws InvalidArgumentException {
        Optional<Distributor> distributorOptional = distributorRepository.findById(distributorId);
        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with ID not exists.");
        }
        Optional<Stock> stockOptional = stockRepository.findByStockOwner(distributorOptional.get().getUnit());
        if (stockOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor does not have any stock.");
        }
        return batchRepository.findAllByStock(stockOptional.get());
    }

    public List<Product> getAllProductInStock(Long distributorId) throws InvalidArgumentException {
       Distributor distributor = getDistributorById(distributorId);
       Stock stock = stockService.getStockByStockOwner(distributor.getUnit());
       return productRepository.findAllByStock(stock);
    }

    /**
     * Lấy danh sách tất cả sản phẩm lỗi không thể sửa chữa trong kho
     */
    public List<Product> getAllErrorProductCannotFixInStock(Long distributorId) throws InvalidArgumentException {
        Distributor distributor = getDistributorById(distributorId);
        Stock stock = stockService.getStockByStockOwner(distributor.getUnit());
        List<Product> products = new ArrayList<>();
        return productRepository.findAllByStockAndStatus(stock, ProductStatus.ERROR_FACTORY);
    }

    /**
     * Đại lý xuất hàng cho cơ sở sản xuất
     */
    public ProductTransaction exportProductToFactory(DistributorExportModel distributorExportModel)
            throws InvalidArgumentException{
        if (!(distributorExportModel.getExportType().equals("Error") ||
            distributorExportModel.getExportType().equals("Cannot sale"))) {
            throw new InvalidArgumentException("exportType invalid");
        }

        Factory factory = factoryService.getFactoryById(distributorExportModel.getFactoryId());
        Distributor distributor = getDistributorById(distributorExportModel.getDistributorId());
        Stock factoryStock = stockService.getStockByStockOwner(factory.getUnit());
        Stock distributorStock = stockService.getStockByStockOwner(distributor.getUnit());

        ProductTransaction productTransaction = new ProductTransaction();
        productTransaction.setExportStock(distributorStock);
        productTransaction.setImportStock(factoryStock);
        productTransaction.setTransactionStatus(StockTransactionStatus.EXPORTING);
        productTransaction = transactionRepository.save(productTransaction);

        List<Long> productIds = distributorExportModel.getProductIds();
        for (int i = 0; i < productIds.size(); ++i) {
            //  Kiểm tra sản phẩm có nằm trong kho của đai lý không
            Product product = productService.getProductById(productIds.get(i));
            if (product.getStock().getId() != distributorStock.getId()) {
                throw new InvalidArgumentException("Sản phẩm không nằm trong kho.");
            }

            if (distributorExportModel.getExportType().equals("Error")) {
                product.setStatus(ProductStatus.ERROR_FACTORY);
            } else {
                product.setStatus(ProductStatus.RETURNED_FACTORY);
                product = productRepository.save(product);
            }

            ProductTransactionDetail productTransactionDetail = new ProductTransactionDetail();
            productTransactionDetail.setProduct(product);
            productTransactionDetail.setProductTransaction(productTransaction);
            transactionDetailRepository.save(productTransactionDetail);
        }

        return productTransaction;
    }

    public List<SoldProductModel> getAllSoldProduct(Long distributorId) throws InvalidArgumentException {
        List<Order> orders = orderService.getAllOrderByDistributorId(distributorId);
        List<Product> products = new ArrayList<>();
        List<SoldProductModel> soldProductModels = new ArrayList<>();
        orders.forEach(order -> {
            order.getOrderDetails().forEach(orderDetail -> {
                Product product = orderDetail.getProduct();
                SoldProductModel soldProduct = new SoldProductModel();
                soldProduct.setId(product.getId());
                soldProduct.setStatus(product.getStatus());
                soldProduct.setBatch(product.getBatch());
                soldProduct.setProductLine(product.getProductLine());
                soldProduct.setOrder(order);

                CustomerProduct customerProduct =
                        customerProductRepository.findByProductId(product.getId()).get();

                soldProduct.setCustomerProduct(customerProduct);
                soldProductModels.add(soldProduct);

                products.add(orderDetail.getProduct());
            });
        });

        return soldProductModels;
    }

    public Distributor getDistributorById(Long distributorId) throws InvalidArgumentException {
        Optional<Distributor> distributorOptional = distributorRepository.findById(distributorId);
        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with ID not exists.");
        }
        return distributorOptional.get();
    }

    public void deleteDistributor(Long distributorId) throws InvalidArgumentException {
        Optional<Distributor> distributorOptional = distributorRepository.findById(distributorId);
        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with ID not exists.");
        }
        distributorRepository.delete(distributorOptional.get());
    }

    public ProductWarranty requestProductWarranty(ProductWarrantyModel productWarrantyModel)
            throws InvalidArgumentException {
        Distributor distributor = getDistributorById(productWarrantyModel.getRequestWarrantyDistributorId());

        Optional<CustomerProduct> customerProductOptional =
                customerProductRepository.findById(productWarrantyModel.getCustomerProductId());
        if (customerProductOptional.isEmpty()) {
            throw new InvalidArgumentException("Customer product with ID not exists.");
        }
        Optional<WarrantyCenter> warrantyCenterOptional = warrantyCenterRepository
                .findById(productWarrantyModel.getWarrantyCenterId());
        if (warrantyCenterOptional.isEmpty()) {
            throw new InvalidArgumentException("Warranty center ID not exists.");
        }

        //  Kiểm tra xem sản phẩm này có đang được bảo hành hay không
        Product product = customerProductOptional.get().getProduct();
        if (!(product.getStatus().equals(ProductStatus.SOLD) || product.getStatus().equals(ProductStatus.RETURNED_WARRANTY)
                || product.getStatus().equals(ProductStatus.ERROR_SUMMON))) {
            throw new InvalidArgumentException("Sản phẩm đang được bảo hành rồi.");
        }
        product.setStatus(ProductStatus.ERROR_WARRANTY);
        productRepository.save(product);

        ProductWarranty productWarranty = new ProductWarranty();
        productWarranty.setRequestWarrantyDistributor(distributor);
        productWarranty.setCustomerProduct(customerProductOptional.get());
        productWarranty.setWarrantyCenter(warrantyCenterOptional.get());
        productWarranty.setStartWarrantyDate(productWarrantyModel.getStartWarrantyDate());
        productWarranty.setDescription(productWarrantyModel.getDescription());
        productWarranty.setCustomer(customerProductOptional.get().getCustomer());
        productWarranty.setStatus(ProductWarrantyStatus.WAITING);
        return productWarrantyRepository.save(productWarranty);
    }

    /**
     * Xác nhận nhập kho đơn hàng được chuyển đến
     */
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
            product.setStatus(ProductStatus.AGENCY);
            product.setStock(productTransaction.getImportStock());
            productRepository.save(product);
        });
    }

    public List<FactoryProductTransactionModel> getAllInComingProductTransaction(Long distributorId)
            throws InvalidArgumentException {
        Distributor distributor = getDistributorById(distributorId);
        Stock stock = stockService.getStockByStockOwner(distributor.getUnit());
        List<FactoryProductTransactionModel> transactionModels = new ArrayList<>();
        List<ProductTransaction> productTransactions = transactionRepository
                .findAllByImportStockAndTransactionStatus(stock, StockTransactionStatus.EXPORTING);
        for (int i = 0; i < productTransactions.size(); ++i) {
            ProductTransaction productTransaction = productTransactions.get(i);
            FactoryProductTransactionModel factoryTransaction = new FactoryProductTransactionModel(
                    productTransaction.getId(), productTransaction.getExportStock(),
                    productTransaction.getImportStock(), productTransaction.getTransactionStatus(),
                    productTransaction.getProductTransactionDetails()
            );
            Factory factory = factoryService
                    .getFactoryByUnitId(productTransaction.getExportStock().getStockOwner().getId());
            factoryTransaction.setFactory(factory);
            transactionModels.add(factoryTransaction);
        }
        return transactionModels;
    }

    /**
     * Trả lại sản phẩm đã bảo hành cho khách hàng
     */
    public void returnWarrantyProductToCustomer(Long productWarrantyId)
            throws InvalidArgumentException {
        Optional<ProductWarranty> productWarrantyOptional = productWarrantyRepository.findById(productWarrantyId);
        if (productWarrantyOptional.isEmpty()) {
            throw new InvalidArgumentException("ProductWarranty with ID not exists");
        }

        // Cập nhập thông tin bảo hành
        ProductWarranty productWarranty = productWarrantyOptional.get();
        if (productWarranty.getStatus().equals(ProductWarrantyStatus.RETURNED)) {
            throw new InvalidArgumentException("ProductWarranty status is returned.");
        }
        productWarranty.setStatus(ProductWarrantyStatus.RETURNED);
        productWarrantyRepository.save(productWarranty);

        //  Cập nhập trạng thái sản phẩm
        Product product = productWarranty.getCustomerProduct().getProduct();
        product.setStatus(ProductStatus.RETURNED_WARRANTY);
        productRepository.save(product);
    }

    /**
     * Trả về các sản phẩm cần triệu hồi theo Đại lý và dòng sản phẩm tương ứng
     */
    public List<CustomerProduct> getAllRecallCustomerProduct(Long distributorId, Long productLineId)
            throws InvalidArgumentException{
        Distributor distributor = getDistributorById(distributorId);
        ProductLine productLine = productLineService.getProductLineById(productLineId);

        List<CustomerProduct> customerProducts = new ArrayList<>();

        List<Order> orders = orderService.getAllOrderByDistributorId(distributorId);
        orders.forEach(order -> {
            order.getOrderDetails().forEach(orderDetail -> {
                Product product = orderDetail.getProduct();
                if (product.getProductLine().getId() == productLine.getId()
                    && (product.getStatus().equals(ProductStatus.SOLD) ||
                        product.getStatus().equals(ProductStatus.RETURNED_WARRANTY))) {
                    Optional<CustomerProduct> customerProductOptional =
                            customerProductRepository.findByProductId(product.getId());
                    customerProducts.add(customerProductOptional.get());
                }
            });
        });

        return customerProducts;
    }

    /**
     * Triệu hồi sản phẩm
     */
    public void recallProduct(Long distributorId, Long productLineId, Long warrantyCenterId)
            throws InvalidArgumentException {
        List<CustomerProduct> customerProducts =
                getAllRecallCustomerProduct(distributorId, productLineId);
        for (int i = 0; i < customerProducts.size(); ++i) {
            CustomerProduct customerProduct = customerProducts.get(i);
            Product product = customerProduct.getProduct();
            product.setStatus(ProductStatus.ERROR_SUMMON);
            productRepository.save(product);
            ProductWarrantyModel productWarrantyModel = new ProductWarrantyModel();
            productWarrantyModel.setCustomerProductId(customerProduct.getProductId());
            productWarrantyModel.setStartWarrantyDate(LocalDate.now());
            productWarrantyModel.setWarrantyCenterId(warrantyCenterId);
            productWarrantyModel.setRequestWarrantyDistributorId(distributorId);
            requestProductWarranty(productWarrantyModel);
        }
    }

    /**
     * Lấy tất cả yêu cầu bảo hành đến từ đại lý (distributorId)
     */
    public List<ProductWarranty> getAllRequestWarranty(Long distributorId) throws InvalidArgumentException {
        Distributor distributor = getDistributorById(distributorId);
        return productWarrantyRepository
                .findAllByRequestWarrantyDistributorAndStatusNotLike(distributor, ProductWarrantyStatus.RETURNED);
    }

    public List<ProductWarranty> getAllFinishedWarranty(Long distributorId) throws InvalidArgumentException {
        Distributor distributor = getDistributorById(distributorId);
        return productWarrantyRepository
                .findAllByRequestWarrantyDistributorAndStatus(distributor, ProductWarrantyStatus.RETURNED);
    }

    public Map<String, Long> getProductStatusStatistic(Long distributorId) throws InvalidArgumentException {
        Distributor distributor = getDistributorById(distributorId);
        Stock stock = stockService.getStockByStockOwner(distributor.getUnit());
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

    public Map<String, Long> getSoldProductStatisticPerMonth(Long distributorId, int year) throws InvalidArgumentException {
        Distributor distributor = getDistributorById(distributorId);
        List<Order> orders = orderService.getAllOrderByDistributorId(distributorId);
        Map<String, Long> data = new HashMap<>();
        for (int i = 1; i <= 12; ++i) {
            data.put(String.valueOf(i), 0L);
        }
        for (int i = 0; i < orders.size(); ++i) {
            Order order = orders.get(i);
            if (order.getOrderDate().getYear() == year) {
                data.put(String.valueOf(order.getOrderDate().getMonthValue()),
                        data.get(String.valueOf(order.getOrderDate().getMonthValue()))
                                + order.getOrderDetails().size());
            }
        }
        return data;
    }

    public Map<String, Long> getSoldProductStatisticPerYear(Long distributorId) throws InvalidArgumentException {
        Distributor distributor = getDistributorById(distributorId);
        int currentYear = LocalDate.now().getYear();
        Map<String, Long> data = new HashMap<>();
        for (int i = currentYear - 5; i <= currentYear; ++i) {
            data.put(String.valueOf(i), 0L);
        }

        List<Order> orders = orderService.getAllOrderByDistributorId(distributor.getId());
        for (int i = 0; i < orders.size(); ++i) {
            Order order = orders.get(i);
            if (order.getOrderDate().getYear() >= currentYear - 5
                    && order.getOrderDate().getYear() <= currentYear) {
                data.put(String.valueOf(order.getOrderDate().getYear()),
                        data.get(String.valueOf(order.getOrderDate().getYear())) + order.getOrderDetails().size());
            }
        }
        return data;
    }

    @Autowired
    public void setDistributorRepository(DistributorRepository distributorRepository) {
        this.distributorRepository = distributorRepository;
    }

    @Autowired
    public void setStockService(StockService stockService) {
        this.stockService = stockService;
    }

    @Autowired
    public void setFactoryService(FactoryService factoryService) {
        this.factoryService = factoryService;
    }

    @Autowired
    public void setProductService(ProductService productService) {
        this.productService = productService;
    }
}
