package com.uet.productionmove.service;

import com.uet.productionmove.entity.User;
import com.uet.productionmove.entity.WarrantyCenter;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.WarrantyCenterModel;
import com.uet.productionmove.repository.UserRepository;
import com.uet.productionmove.repository.WarrantyCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.UUID;

@Service
public class WarrantyCenterService {

    @Autowired
    private WarrantyCenterRepository warrantyCenterRepository;
    @Autowired
    private UserRepository userRepository;

    public WarrantyCenter createWarrantyCenter(WarrantyCenterModel warrantyCenterModel)
            throws InvalidArgumentException {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(warrantyCenterModel.getUserId()));
        if (userOptional.isEmpty()) {
            throw new InvalidArgumentException("User with ID not exists.");
        }

        WarrantyCenter warrantyCenter = new WarrantyCenter(
                warrantyCenterModel.getName(),
                userOptional.get(),
                warrantyCenterModel.getPhoneNumber(),
                warrantyCenterModel.getAddress()
        );
        return warrantyCenterRepository.save(warrantyCenter);
    }

    public WarrantyCenter updateWarrantyCenter(WarrantyCenterModel warrantyCenterModel)
        throws InvalidArgumentException {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(warrantyCenterModel.getUserId()));
        Optional<WarrantyCenter> warrantyCenterOptional = warrantyCenterRepository.findById(warrantyCenterModel.getId());

        if (userOptional.isEmpty()) {
            throw new InvalidArgumentException("User with ID not exists.");
        }

        if (warrantyCenterOptional.isEmpty()) {
            throw new InvalidArgumentException("Warranty center with ID not exists.");
        }

        WarrantyCenter warrantyCenter = warrantyCenterOptional.get();
        warrantyCenter.setUser(userOptional.get());
        warrantyCenter.setName(warrantyCenterModel.getName());
        warrantyCenter.setAddress(warrantyCenterModel.getAddress());
        warrantyCenter.setPhoneNumber(warrantyCenterModel.getPhoneNumber());
        return warrantyCenterRepository.save(warrantyCenter);
    }

}
