package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Product;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(path = "/api/product")
@PreAuthorize("hasAnyAuthority('Admin', 'Manufacture', 'Distributor', 'Warranty center') and isAuthenticated()")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping(path = "get")
    public ResponseEntity<Product> getProductById(@RequestParam Long productId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @GetMapping(path = "list")
    public ResponseEntity<List<Product>> getAllProduct(
            @RequestParam(required = false, defaultValue = "") String status,
            @RequestParam(required = false, defaultValue = "-1") Long stockId
    ) throws InvalidArgumentException {
        List<Product> products = productService.getAllProduct(status, stockId);
        return ResponseEntity.ok(products);
    }

    @GetMapping(path = "statusStatistic")
    public ResponseEntity<Map<String, Long>> getProductStatusStatistic() {
        return ResponseEntity.ok(productService.getProductStatusStatistic());
    }

}
