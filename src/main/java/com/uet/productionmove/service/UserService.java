package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.model.UserModel;
import com.uet.productionmove.repository.DistributorRepository;
import com.uet.productionmove.repository.FactoryRepository;
import com.uet.productionmove.repository.UserRepository;
import com.uet.productionmove.repository.WarrantyCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
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

    public UserEntity createAccount(String username, String password, String accountType) {
        if (!userRepository.existsByUsername(username)) {
            UserEntity user = new UserEntity();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(accountType);
            return userRepository.save(user);
        }

        return null;
    }

    public boolean createAccountInformation(
            UserEntity userEntity, String accountType,
            String name, String phoneNumber,
            AddressEntity address) {
        if (userRepository.existsById(userEntity.getId())) {
            switch (accountType) {
                case UserType.DISTRIBUTOR:
                    DistributorEntity distributorEntity = new DistributorEntity(
                            name, userEntity, address, phoneNumber
                    );
                    distributorRepository.save(distributorEntity);
                    break;

                case UserType.MANUFACTURE:
                    FactoryEntity manufactureFactory = new FactoryEntity(
                           userEntity, name, phoneNumber, address
                    );
                    factoryRepository.save(manufactureFactory);
                    break;

                case UserType.WARRANTY_CENTER:
                    WarrantyCenterEntity warrantyCenter = new WarrantyCenterEntity(
                            name, userEntity, address, phoneNumber
                    );
                    warrantyCenterRepository.save(warrantyCenter);
                    break;
            };
            return true;
        }

        return false;
    }

    private void initAdminAccount() {
        if (userRepository.findByUsername("admin").isEmpty()) {
            UserEntity user = new UserEntity();
            user.setUsername("admin");
            user.setPassword(passwordEncoder.encode("admin"));
            user.setRole("Admin");
            userRepository.save(user);
        }
    }

    public List<UserModel> getAllUser(int page, int size) {
        List<UserModel> userModels = new ArrayList<>();

        Pageable pageable = PageRequest.of(page, size);
        Page<UserEntity> userEntityPage = userRepository.findAll(pageable);
        List<UserEntity> userEntities = userEntityPage.toList();
        userEntities.forEach(userEntity -> {
            UserModel userModel = new UserModel(userEntity);
            switch (userEntity.getRole()) {
                case UserType.DISTRIBUTOR:
                    distributorRepository.findByUserId(userEntity.getId()).ifPresent(
                            distributorEntity -> {
                                userModel.setName(distributorEntity.getName());
                                userModel.setPhoneNumber(distributorEntity.getPhoneNumber());
                                userModel.setAddress(distributorEntity.getAddress().toString());
                            }
                    );
                    break;
                case UserType.MANUFACTURE:
                    factoryRepository.findByUserId(userEntity.getId()).ifPresent(
                            factoryEntity -> {
                                userModel.setName(factoryEntity.getName());
                                userModel.setPhoneNumber(factoryEntity.getPhoneNumber());
                                userModel.setAddress(factoryEntity.getAddress().toString());
                            }
                    );
                    break;
                case UserType.WARRANTY_CENTER:
                    warrantyCenterRepository.findByUserId(userEntity.getId()).ifPresent(
                            warrantyCenter -> {
                                userModel.setName(warrantyCenter.getName());
                                userModel.setPhoneNumber(warrantyCenter.getPhoneNumber());
                                userModel.setAddress(warrantyCenter.getAddress().toString());
                            }
                    );
                    break;
            }
            userModels.add(userModel);
        });
        return userModels;
    }
}
