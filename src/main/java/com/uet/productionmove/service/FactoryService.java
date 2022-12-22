package com.uet.productionmove.service;

import com.uet.productionmove.entity.Factory;
import com.uet.productionmove.entity.User;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.FactoryModel;
import com.uet.productionmove.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;

import javax.swing.text.html.Option;
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
    private UserService userService;

    public Factory createFactory(FactoryModel factoryModel) throws InvalidArgumentException {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(factoryModel.getUserId()));
        if (userOptional.isPresent()) {
            Factory factory = new Factory(
                    userOptional.get(),
                    factoryModel.getName(),
                    factoryModel.getPhoneNumber(),
                    factoryModel.getAddress()
            );
            return factoryRepository.save(factory);
        } else {
            throw new InvalidArgumentException("User with ID not exists");
        }
    }

    public Factory updateFactory(FactoryModel factoryModel) throws InvalidArgumentException {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(factoryModel.getUserId()));
        Optional<Factory> factoryOptional = factoryRepository.findById(factoryModel.getId());

        if (userOptional.isEmpty()) {
            throw new InvalidArgumentException("User with ID not exists.");
        }

        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with ID not exists.");
        }

        Factory factory = factoryOptional.get();
        factory.setUser(userOptional.get());
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

    public Factory getFactoryByUserId(String userId) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findByUserId(UUID.fromString(userId));
        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with User ID not exists.");
        }
        return factoryOptional.get();
    }

    public void deleteFactoryById(Long factoryId) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findById(factoryId);
        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with ID not exists.");
        }
        factoryRepository.deleteById(factoryId);
        userService.deleteUser(factoryOptional.get().getUser().getId());
    }

    public void deleteFactoryByUserId(String userId) throws InvalidArgumentException {
        Optional<Factory> factoryOptional = factoryRepository.findByUserId(UUID.fromString(userId));
        if (factoryOptional.isEmpty()) {
            throw new InvalidArgumentException("Factory with ID not exists.");
        }
        factoryRepository.deleteByUserId(UUID.fromString(userId));
        userService.deleteUser(factoryOptional.get().getUser().getId());
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
