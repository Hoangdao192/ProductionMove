package com.uet.productionmove.service;

import com.uet.productionmove.entity.Distributor;
import com.uet.productionmove.entity.User;
import com.uet.productionmove.exception.user.DistributorNotExistsException;
import com.uet.productionmove.exception.user.UserNotExistsException;
import com.uet.productionmove.model.DistributorModel;
import com.uet.productionmove.repository.DistributorRepository;
import com.uet.productionmove.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class DistributorService {
    @Autowired
    private DistributorRepository distributorRepository;
    @Autowired
    private UserRepository userRepository;

    public Distributor createDistributor(DistributorModel distributorModel) throws UserNotExistsException {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(distributorModel.getUserId()));
        if (userOptional.isPresent()) {
            Distributor distributor = new Distributor(
                    distributorModel.getName(),
                    userOptional.get(),
                    distributorModel.getAddress(),
                    distributorModel.getPhoneNumber()
            );
            return distributorRepository.save(distributor);
        } else {
            throw new UserNotExistsException("User with ID not exists");
        }
    }

    public Distributor updateDistributor(DistributorModel distributorModel) throws UserNotExistsException, DistributorNotExistsException {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(distributorModel.getUserId()));
        Optional<Distributor> distributorOptional = distributorRepository.findById(distributorModel.getId());

        if (userOptional.isEmpty()) {
            throw new UserNotExistsException("User with ID not exists");
        }

        if (distributorOptional.isEmpty()) {
            throw new DistributorNotExistsException("Distributor with ID not exists");
        }

        Distributor distributor = distributorOptional.get();
        distributor.setUser(userOptional.get());
        distributor.setName(distributorModel.getName());
        distributor.setAddress(distributorModel.getAddress());
        distributor.setPhoneNumber(distributorModel.getPhoneNumber());
        return distributorRepository.save(distributor);
    }
}
