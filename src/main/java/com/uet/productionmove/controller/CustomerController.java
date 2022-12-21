package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Customer;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/customer")
public class CustomerController {

    private CustomerService customerService;

    @PostMapping(path = "create")
    public ResponseEntity<Map<String, Object>> createCustomer(
            @RequestBody @Valid Customer customer) {
        customer = customerService.createCustomer(customer);
        return ResponseEntity.ok(Map.of(
                "message", "Create customer successful",
                "content", Map.of("customer", customer)
        ));
    }

    @PostMapping(path = "update")
    public ResponseEntity<Map<String, Object>> updateCustomer(
            @RequestBody @Valid Customer customer
    ) throws InvalidArgumentException {
        customer = customerService.updateCustomer(customer);
        return ResponseEntity.ok(Map.of(
                "message", "Update customer successful",
                "content", Map.of("customer", customer)
        ));
    }

    @GetMapping(path = "get")
    public ResponseEntity<Customer> getCustomer(@RequestParam Long customerId)
            throws InvalidArgumentException {
        Customer customer = customerService.getCustomer(customerId);
        return ResponseEntity.ok(customer);
    }

    @GetMapping(path = "list")
    public ResponseEntity<List<Customer>> getAllCustomer() {
        return ResponseEntity.ok(customerService.getAllCustomer());
    }

    @DeleteMapping(path = "delete/{customerId}")
    public ResponseEntity<Map<String, Object>> deleteCustomer(@PathVariable Long customerId)
            throws InvalidArgumentException {
        customerService.deleteCustomer(customerId);
        return ResponseEntity.ok(Map.of(
                "message", "Delete customer successful",
                "content", Map.of("id", customerId)
        ));
    }

    @Autowired
    public void setCustomerService(CustomerService customerService) {
        this.customerService = customerService;
    }
}
