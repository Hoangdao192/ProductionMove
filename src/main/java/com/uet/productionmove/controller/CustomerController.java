package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Customer;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/customer")
@PreAuthorize("hasAnyAuthority('Admin', 'Distributor', 'Warranty center') and isAuthenticated()")
@CrossOrigin("http://localhost:3000")
public class CustomerController {

    private CustomerService customerService;

    @PostMapping(path = "create")
    @PreAuthorize("hasAnyAuthority('Admin', 'Distributor') and isAuthenticated()")
    public ResponseEntity<Customer> createCustomer(
            @RequestBody @Valid Customer customer) {
        customer = customerService.createCustomer(customer);
        return ResponseEntity.ok(customer);
    }

    @PostMapping(path = "update")
    public ResponseEntity<Customer> updateCustomer(
            @RequestBody @Valid Customer customer) throws InvalidArgumentException {
        customer = customerService.updateCustomer(customer);
        return ResponseEntity.ok(customer);
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
                "content", Map.of("id", customerId)));
    }

    @Autowired
    public void setCustomerService(CustomerService customerService) {
        this.customerService = customerService;
    }
}
