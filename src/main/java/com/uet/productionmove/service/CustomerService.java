package com.uet.productionmove.service;

import com.uet.productionmove.entity.Customer;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    private CustomerRepository customerRepository;
    private OrderService orderService;

    public Customer createCustomer(Customer customer) {
        customer.setId(null);
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Customer customer) throws InvalidArgumentException {
        Optional<Customer> customerOptional = customerRepository.findById(customer.getId());
        if (customerOptional.isEmpty()) {
            throw new InvalidArgumentException("Customer with ID not exists.");
        }
        return customerRepository.save(customer);
    }

    public Customer getCustomer(Long customerId) throws InvalidArgumentException {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        if (customerOptional.isEmpty()) {
            throw new InvalidArgumentException("Customer with ID not exists.");
        }
        return customerOptional.get();
    }

    public void deleteCustomer(Long customerId) throws InvalidArgumentException {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        if (customerOptional.isEmpty()) {
            throw new InvalidArgumentException("Customer with ID not exists.");
        }
        orderService.deleteOrderByCustomer(customerId);
        customerRepository.deleteById(customerId);
    }

    public List<Customer> getAllCustomer() {
        return customerRepository.findAll();
    }

    @Autowired
    public void setCustomerRepository(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Autowired
    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }
}
