package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
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

    public User createUser(User user) throws InvalidArgumentException {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new InvalidArgumentException("User with username exists.");
        }

        user.setId(null);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(User user) throws InvalidArgumentException {
        Optional<User> userOptional = userRepository.findById(user.getId());
        if (userOptional.isEmpty()) {
            throw new InvalidArgumentException("User with ID not exists.");
        }

        User dbUser = userOptional.get();
        dbUser.setUsername(user.getUsername());
        dbUser.setPassword(user.getPassword());
        dbUser.setRole(user.getRole());

        return userRepository.save(dbUser);
    }

    public boolean deleteUser(String userId) throws InvalidArgumentException {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(userId));
        if (userOptional.isEmpty()) {
            throw new InvalidArgumentException("User with ID not exists.");
        }

        User user = userOptional.get();
//        switch (user.getRole()) {
//            case UserType.DISTRIBUTOR:
//                distributorRepository.deleteByUserId(user.getId());
//                break;
//            case UserType.MANUFACTURE:
//                factoryRepository.deleteByUserId(user.getId());
//                break;
//            case UserType.WARRANTY_CENTER:
//                warrantyCenterRepository.deleteByUserId(user.getId());
//                break;
//        }
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
