package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.DistributorModel;
import com.uet.productionmove.model.ProductWarrantyModel;
import com.uet.productionmove.model.SoldProductModel;
import com.uet.productionmove.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.StackWalker.Option;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        List<ProductBatch> productBatchesInStock = getAllProductBatchInStock(distributorId);
        List<Product> products = new ArrayList<>();
        productBatchesInStock.forEach(productBatch -> {
            List<Product> result = productRepository.findAllByBatchAndStatus(productBatch, ProductStatus.AGENCY);
            products.addAll(result);
        });
        return products;
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


    @Autowired
    public void setDistributorRepository(DistributorRepository distributorRepository) {
        this.distributorRepository = distributorRepository;
    }
}
