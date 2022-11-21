package com.uet.productionmove.service;

import com.uet.productionmove.entity.UserEntity;
import com.uet.productionmove.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService{
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        initAdminAccount();
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
}
