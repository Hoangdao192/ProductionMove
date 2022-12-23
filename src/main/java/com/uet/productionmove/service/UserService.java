package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.exception.user.UsernameExistsException;
import com.uet.productionmove.model.UserModel;
import com.uet.productionmove.repository.*;
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
//    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    public UserService(
            DistributorRepository distributorRepository, WarrantyCenterRepository warrantyCenterRepository,
            FactoryRepository factoryRepository, UserRepository userRepository,
            UnitRepository unitRepository,
            PasswordEncoder passwordEncoder) {
        this.distributorRepository = distributorRepository;
        this.warrantyCenterRepository = warrantyCenterRepository;
        this.factoryRepository = factoryRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.unitRepository = unitRepository;
        initAdminAccount();
    }

    public User createUser(UserModel userModel) throws InvalidArgumentException {
        if (userRepository.existsByUsername(userModel.getUsername())) {
            throw new InvalidArgumentException("User with username exists.");
        }

        Optional<Unit> unitOptional = unitRepository.findById(userModel.getUnitId());
        if (unitOptional.isEmpty()) {
            throw new InvalidArgumentException("Unit with ID not exists.");
        }

        User user = new User();
        user.setUnit(unitOptional.get());
        user.setUsername(userModel.getUsername());
        user.setRole(userModel.getRole());
        user.setPassword(passwordEncoder.encode(userModel.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(UserModel userModel) throws InvalidArgumentException {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(userModel.getId()));
        if (userOptional.isEmpty()) {
            throw new InvalidArgumentException("User with ID not exists.");
        }

        User dbUser = userOptional.get();
        dbUser.setPassword(passwordEncoder.encode(userModel.getPassword()));

        return userRepository.save(dbUser);
    }

    public boolean deleteUser(String userId) throws InvalidArgumentException {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(userId));
        if (userOptional.isEmpty()) {
            throw new InvalidArgumentException("User with ID not exists.");
        }

        User user = userOptional.get();
        userRepository.deleteById(user.getId());
        return true;
    }

    public void deleteUser(UUID userId) throws InvalidArgumentException {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new InvalidArgumentException("User with ID not exists.");
        }
        userRepository.deleteById(userId);
    }

    private void initAdminAccount() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            Unit unit = new Unit();
            unit.setType("Admin");
            unit = unitRepository.save(unit);

            User user = new User();
            user.setUnit(unit);
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

    public User getUserById(String userId) throws InvalidArgumentException {
        log.info("Get user by id");
        Optional<User> userOptional = userRepository.findById(UUID.fromString(userId));
        if (userOptional.isEmpty()) {
            throw new InvalidArgumentException("User with ID not exists.");
        }

        return userOptional.get();
    }

    public User getUserByUsername(String username) throws InvalidArgumentException {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            throw new InvalidArgumentException("User with username not exists.");
        }

        return userOptional.get();
    }
}
