package com.uet.productionmove.service;

import com.uet.productionmove.entity.Factory;
import com.uet.productionmove.entity.Unit;
import com.uet.productionmove.entity.User;
import com.uet.productionmove.entity.UserType;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.FactoryModel;
import com.uet.productionmove.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FactoryService {

    private ProductLineRepository productLineRepository;
    private BatchRepository batchRepository;
    private FactoryRepository factoryRepository;
    private StockRepository stockRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UnitRepository unitRepository;
    @Autowired
    private UserService userService;

    public Factory createFactory(FactoryModel factoryModel) throws InvalidArgumentException {
        Unit unit = new Unit();
        unit.setType(UserType.MANUFACTURE);
        unit = unitRepository.save(unit);

        Factory factory = new Factory(
                unit,
                factoryModel.getName(),
                factoryModel.getPhoneNumber(),
                factoryModel.getAddress()
        );
        return factoryRepository.save(factory);
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
