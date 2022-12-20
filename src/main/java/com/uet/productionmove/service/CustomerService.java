package com.uet.productionmove.service;

import com.uet.productionmove.entity.Order;
import com.uet.productionmove.exception.order.CreateOrderException;
import com.uet.productionmove.repository.CustomerRepository;
import com.uet.productionmove.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

//    public void createOrder(Order order) throws CreateOrderException {
//        if (order.getId() != null) {
//            throw new CreateOrderException("You cannot specify id for order, it is auto generated");
//        }
//
//        if (order.getOrderDate() == null) {
//            throw new CreateOrderException("Order date cannot be null");
//        }
//
//        if (customerRepository.existsById(order.getCustomerId())) {
//            orderRepository.save(order);
//        }
//    }
}
