package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.user.UsernameExistsException;
import com.uet.productionmove.repository.DistributorRepository;
import com.uet.productionmove.repository.FactoryRepository;
import com.uet.productionmove.repository.UserRepository;
import com.uet.productionmove.repository.WarrantyCenterRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class UserService {
    private DistributorRepository distributorRepository;
    private WarrantyCenterRepository warrantyCenterRepository;
    private FactoryRepository factoryRepository;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(
            DistributorRepository distributorRepository, WarrantyCenterRepository warrantyCenterRepository,
            FactoryRepository factoryRepository, UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.distributorRepository = distributorRepository;
        this.warrantyCenterRepository = warrantyCenterRepository;
        this.factoryRepository = factoryRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        initAdminAccount();
    }

    public User createUser(String username, String password, String accountType) {
        if (!userRepository.existsByUsername(username)) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(accountType);
            return userRepository.save(user);
        }

        return null;
    }

    public User createUser(User user) throws UsernameExistsException {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new UsernameExistsException();
        }
        user.setId(null);
        return userRepository.save(user);
    }

    public Factory createFactory(Factory factory) {
        return factoryRepository.save(factory);
    }

    public Factory updateFactory(Factory factory) {
        if (factory.getId() != null && factoryRepository.existsById(factory.getId())) {
            return factoryRepository.save(factory);
        }
        return null;
    }

    public Optional<Factory> getFactoryByUser(String userId) {
        return factoryRepository.findByUserId(UUID.fromString(userId));
    }

    public Distributor createDistributor(Distributor distributor) {
        return distributorRepository.save(distributor);
    }

    public Distributor updateDistributor(Distributor distributor) {
        if (distributor.getId() != null && distributorRepository.existsById(distributor.getId())) {
            return distributorRepository.save(distributor);
        }
        return null;
    }

    public Optional<Distributor> getDistributorByUser(String userId) {
        return distributorRepository.findByUserId(UUID.fromString(userId));
    }

    public WarrantyCenter createWarrantyCenter(WarrantyCenter warrantyCenter) {
        return warrantyCenterRepository.save(warrantyCenter);
    }

    public WarrantyCenter updateWarrantyCenter(WarrantyCenter warrantyCenter) {
        if (warrantyCenter.getId() != null && warrantyCenterRepository.existsById(warrantyCenter.getId())) {
            return warrantyCenterRepository.save(warrantyCenter);
        }
        return null;
    }

    public Optional<WarrantyCenter> getWarrantyCenterByUser(String userId) {
        return warrantyCenterRepository.findByUserId(UUID.fromString(userId));
    }

    public User updateUser(User user) {
        if (user.getId() != null && userRepository.existsById(user.getId())) {
            return userRepository.save(user);
        }
        return null;
    }

    public boolean deleteUser(String userId) {
        Optional<User> optionalUserEntity = getUserById(userId);
        if (optionalUserEntity.isPresent()) {
            User user = optionalUserEntity.get();
            switch (user.getRole()) {
                case UserType.DISTRIBUTOR:
                    distributorRepository.deleteByUserId(user.getId());
                    break;
                case UserType.MANUFACTURE:
                    factoryRepository.deleteByUserId(user.getId());
                    break;
                case UserType.WARRANTY_CENTER:
                    warrantyCenterRepository.deleteByUserId(user.getId());
                    break;
            }
            userRepository.deleteById(user.getId());
            return true;
        }
        return false;
    }

    private void initAdminAccount() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User user = new User();
            user.setUsername("admin");
            user.setPassword(passwordEncoder.encode("admin"));
            user.setRole("Admin");
            userRepository.save(user);
        }
    }

    public Page<User> getAllUser(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    public Optional<User> getUserById(String userId) {
        log.info("Get user by id");
        return userRepository.findById(UUID.fromString(userId));
    }
}
