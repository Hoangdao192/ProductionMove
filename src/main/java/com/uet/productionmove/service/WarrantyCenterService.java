package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.ProductWarrantyModel;
import com.uet.productionmove.model.WarrantyCenterModel;
import com.uet.productionmove.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WarrantyCenterService {

    private WarrantyCenterRepository warrantyCenterRepository;

    private UserRepository userRepository;
    @Autowired
    private UnitRepository unitRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductWarrantyRepository productWarrantyRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private DistributorRepository distributorRepository;
    @Autowired
    private CustomerProductRepository customerProductRepository;

    public WarrantyCenter getWarrantyCenterById(Long warrantyCenterId)
            throws InvalidArgumentException {
        Optional<WarrantyCenter> warrantyCenterOptional =
                warrantyCenterRepository.findById(warrantyCenterId);
        if (warrantyCenterOptional.isEmpty()) {
            throw new InvalidArgumentException("Warranty center with ID not exists.");
        }
        return warrantyCenterOptional.get();
    }

    public WarrantyCenter createWarrantyCenter(WarrantyCenterModel warrantyCenterModel)
            throws InvalidArgumentException {
        Unit unit = new Unit();
        unit.setType(UserType.WARRANTY_CENTER);
        unit = unitRepository.save(unit);

        WarrantyCenter warrantyCenter = new WarrantyCenter(
                unit,
                warrantyCenterModel.getName(),
                warrantyCenterModel.getPhoneNumber(),
                warrantyCenterModel.getAddress());
        return warrantyCenterRepository.save(warrantyCenter);
    }

    public WarrantyCenter updateWarrantyCenter(WarrantyCenterModel warrantyCenterModel)
            throws InvalidArgumentException {
        Optional<WarrantyCenter> warrantyCenterOptional = warrantyCenterRepository
                .findById(warrantyCenterModel.getId());

        if (warrantyCenterOptional.isEmpty()) {
            throw new InvalidArgumentException("Warranty center with ID not exists.");
        }

        WarrantyCenter warrantyCenter = warrantyCenterOptional.get();
        warrantyCenter.setName(warrantyCenterModel.getName());
        warrantyCenter.setAddress(warrantyCenterModel.getAddress());
        warrantyCenter.setPhoneNumber(warrantyCenterModel.getPhoneNumber());
        return warrantyCenterRepository.save(warrantyCenter);
    }

    public WarrantyCenter getWarrantyCenterByUnitId(Long unitId) throws InvalidArgumentException {
        Optional<WarrantyCenter> warrantyCenterOptional = warrantyCenterRepository.findByUnitId(unitId);
        if (warrantyCenterOptional.isEmpty()) {
            throw new InvalidArgumentException("Warranty center with Unit ID not exists.");
        }
        return warrantyCenterOptional.get();
    }

    public void deleteWarrantyCenter(Long warrantyCenterId) throws InvalidArgumentException {
        Optional<WarrantyCenter> warrantyCenterOptional = warrantyCenterRepository.findById(warrantyCenterId);
        if (warrantyCenterOptional.isEmpty()) {
            throw new InvalidArgumentException("Warranty center with ID not exists.");
        }

        warrantyCenterRepository.delete(warrantyCenterOptional.get());
    }

    public List<WarrantyCenterModel> getAllWarrantyCenter() {
        List<WarrantyCenterModel> warrantyCenterModels = new ArrayList<>();
        warrantyCenterRepository.findAll().forEach(warrantyCenter -> {
            WarrantyCenterModel warrantyCenterModel = new WarrantyCenterModel();
            warrantyCenterModel.setId(warrantyCenter.getId());
            warrantyCenterModel.setUnitId(warrantyCenter.getUnit().getId());
            warrantyCenterModel.setName(warrantyCenter.getName());
            warrantyCenterModel.setAddress(warrantyCenter.getAddress());
            warrantyCenterModel.setPhoneNumber(warrantyCenter.getPhoneNumber());
            warrantyCenterModels.add(warrantyCenterModel);
        });
        return warrantyCenterModels;
    }

    public ProductWarranty createProductWarranty(ProductWarrantyModel productWarrantyModel)
            throws InvalidArgumentException {
        Optional<Distributor> distributorOptional =
                distributorRepository.findById(productWarrantyModel.getRequestWarrantyDistributorId());
        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with ID not exists.");
        }
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
        if (!productWarrantyRepository
                .findAllByCustomerProductAndEndWarrantyDateIsNull(customerProductOptional.get())
                .isEmpty()) {
            throw new InvalidArgumentException("Sản phẩm này đang được bảo hành.");
        }

        Product product = customerProductOptional.get().getProduct();
        product.setStatus(ProductStatus.ERROR_WARRANTY);

        ProductWarranty productWarranty = new ProductWarranty();
        productWarranty.setRequestWarrantyDistributor(distributorOptional.get());
        productWarranty.setCustomerProduct(customerProductOptional.get());
        productWarranty.setWarrantyCenter(warrantyCenterOptional.get());
        productWarranty.setStartWarrantyDate(productWarrantyModel.getStartWarrantyDate());
        productWarranty.setDescription(productWarrantyModel.getDescription());
        productWarranty.setCustomer(customerProductOptional.get().getCustomer());
        return productWarrantyRepository.save(productWarranty);
    }

    public List<ProductWarranty> getAllWarrantyByWarrantyCenterId(Long warrantyCenterId) throws InvalidArgumentException {
        Optional<WarrantyCenter> warrantyCenterOptional
                = warrantyCenterRepository.findById(warrantyCenterId);
        if (warrantyCenterOptional.isEmpty()) {
            throw new InvalidArgumentException("Warranty center with ID not exists.");
        }

        return productWarrantyRepository.findAllByWarrantyCenter(warrantyCenterOptional.get());
    }

    public ProductWarranty getProductWarrantyById(Long productWarrantyId) throws InvalidArgumentException {
        Optional<ProductWarranty> productWarrantyOptional =
                productWarrantyRepository.findById(productWarrantyId);
        if (productWarrantyOptional.isEmpty()) {
            throw new InvalidArgumentException("ProductWarranty with ID not exists.");
        }
        return productWarrantyOptional.get();
    }

    /**
     * Lấy tất cả yêu cầu bảo hành gửi đến trung tâm bảo hành
     */
    public List<ProductWarranty> getAllProductWarrantyRequest(Long warrantyCenterId)
            throws InvalidArgumentException {
        WarrantyCenter warrantyCenter = getWarrantyCenterById(warrantyCenterId);
        return productWarrantyRepository
                .findAllByWarrantyCenterAndStatus(warrantyCenter, ProductWarrantyStatus.WAITING);
    }

    /**
     * Lấy tất cả yêu cầu bảo hành đang bảo hành
     */
    public List<ProductWarranty> getAllDoingProductWarranty(Long warrantyCenterId) throws InvalidArgumentException {
        WarrantyCenter warrantyCenter = getWarrantyCenterById(warrantyCenterId);
        return productWarrantyRepository
                .findAllByWarrantyCenterAndStatus(warrantyCenter, ProductWarrantyStatus.DOING);
    }

    /**
     * Trung tâm bảo hành chấp nhận yêu cầu bảo hành.
     */
    public void acceptWarrantyRequest(Long productWarrantyId) throws InvalidArgumentException {
        ProductWarranty productWarranty = getProductWarrantyById(productWarrantyId);
        if (productWarranty.getStatus().equals(ProductWarrantyStatus.DOING)) {
            throw new InvalidArgumentException("ProductWarranty status is doing.");
        }

        productWarranty.setStatus(ProductWarrantyStatus.DOING);

        Product product = productWarranty.getCustomerProduct().getProduct();
        product.setStatus(ProductStatus.UNDER_WARRANTY);

        productWarrantyRepository.save(productWarranty);
        productRepository.save(product);
    }

    /**
     * Xác nhận bảo hành thành công
     */
    public void finishWarranty(Long productWarrantyId) throws InvalidArgumentException {
        ProductWarranty productWarranty = getProductWarrantyById(productWarrantyId);
        if (productWarranty.getStatus().equals(ProductWarrantyStatus.DONE)) {
            throw new InvalidArgumentException("ProductWarranty status is Done already.");
        }

        productWarranty.setStatus(ProductWarrantyStatus.DONE);

        Product product = productWarranty.getCustomerProduct().getProduct();
        product.setStatus(ProductStatus.DONE_WARRANTY);

        productWarrantyRepository.save(productWarranty);
        productRepository.save(product);
    }


    @Autowired
    public void setWarrantyCenterRepository(
            WarrantyCenterRepository warrantyCenterRepository) {
        this.warrantyCenterRepository = warrantyCenterRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
