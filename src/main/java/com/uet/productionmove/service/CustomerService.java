package com.uet.productionmove.service;

import com.uet.productionmove.entity.AddressEntity;
import com.uet.productionmove.entity.CustomerEntity;
import com.uet.productionmove.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    private CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;

//        CustomerEntity customerEntity = customerRepository.save(new CustomerEntity(
//                "Nguyễn Đăng", "Hoàng Đạo", "0325135251",
//                new AddressEntity(
//                        "Hải Dương", "Kim Thành", "Đồng Cẩm", "Đội 7 - Đại Đồng"
//                )
//        ));
    }
}
