package com.uet.productionmove.service;

import com.uet.productionmove.entity.Distributor;
import com.uet.productionmove.entity.User;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.DistributorModel;
import com.uet.productionmove.repository.DistributorRepository;
import com.uet.productionmove.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class DistributorService {

    private DistributorRepository distributorRepository;
    private UserRepository userRepository;

    public Distributor createDistributor(DistributorModel distributorModel)
            throws InvalidArgumentException {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(distributorModel.getUserId()));

        if (userOptional.isEmpty()) {
            throw new InvalidArgumentException("User with ID not exists.");
        }

        Distributor distributor = new Distributor(
                distributorModel.getName(),
                userOptional.get(),
                distributorModel.getAddress(),
                distributorModel.getPhoneNumber()
        );

        return distributorRepository.save(distributor);
    }

    public Distributor updateDistributor(DistributorModel distributorModel)
            throws InvalidArgumentException {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(distributorModel.getUserId()));
        Optional<Distributor> distributorOptional = distributorRepository.findById(distributorModel.getId());

        if (userOptional.isEmpty()) {
            throw new InvalidArgumentException("User with ID not exists");
        }

        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with ID not exists");
        }

        Distributor distributor = distributorOptional.get();
        distributor.setUser(userOptional.get());
        distributor.setName(distributorModel.getName());
        distributor.setAddress(distributorModel.getAddress());
        distributor.setPhoneNumber(distributorModel.getPhoneNumber());
        return distributorRepository.save(distributor);
    }

    @Autowired
    public void setDistributorRepository(DistributorRepository distributorRepository) {
        this.distributorRepository = distributorRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
