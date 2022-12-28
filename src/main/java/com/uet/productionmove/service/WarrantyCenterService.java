package com.uet.productionmove.service;

import com.uet.productionmove.entity.Customer;
import com.uet.productionmove.entity.Product;
import com.uet.productionmove.entity.ProductWarranty;
import com.uet.productionmove.entity.Unit;
import com.uet.productionmove.entity.UserType;
import com.uet.productionmove.entity.WarrantyCenter;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.ProductWarrantyModel;
import com.uet.productionmove.model.WarrantyCenterModel;
import com.uet.productionmove.repository.CustomerRepository;
import com.uet.productionmove.repository.ProductRepository;
import com.uet.productionmove.repository.ProductWarrantyRepository;
import com.uet.productionmove.repository.UnitRepository;
import com.uet.productionmove.repository.UserRepository;
import com.uet.productionmove.repository.WarrantyCenterRepository;
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
        Optional<Product> productOptional = productRepository.findById(productWarrantyModel.getProductId());
        if (productOptional.isEmpty()) {
            throw new InvalidArgumentException("Product with ID not exists.");
        }
        Optional<WarrantyCenter> warrantyCenterOptional = warrantyCenterRepository
                .findById(productWarrantyModel.getWarrantyCenterId());
        if (warrantyCenterOptional.isEmpty()) {
            throw new InvalidArgumentException("Warranty center ID not exists.");
        }

        ProductWarranty productWarranty = new ProductWarranty();
        productWarranty.setProduct(productOptional.get());
        productWarranty.setWarrantyCenter(warrantyCenterOptional.get());
        productWarranty.setStartWarrantyDate(productWarrantyModel.getStartWarrantyDate());
        productWarranty.setDescription(productWarrantyModel.getDescription());
        return productWarrantyRepository.save(productWarranty);
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
