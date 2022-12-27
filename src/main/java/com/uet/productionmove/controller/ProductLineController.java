package com.uet.productionmove.controller;

import com.uet.productionmove.entity.ProductLine;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.service.ProductLineService;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(path = "/api/product_line")
@PreAuthorize("hasAnyAuthority('Admin', 'Manufacture', 'Distributor') and isAuthenticated()")
public class ProductLineController {

    @Autowired
    private ProductLineService productLineService;

    // @GetMapping(path = "/list")
    // public Page<ProductLine> getAllProductLine(
    // @RequestParam(defaultValue = "0") int page,
    // @RequestParam(defaultValue = "10") int perPage
    // ) {
    // return productLineService.getAllProductLine(page, perPage);
    // }

    @GetMapping(path = "/list")
    public ResponseEntity<List<ProductLine>> getAllProductLine() {
        return ResponseEntity.ok(productLineService.getAllProductLine());
    }

    @PostMapping(path = "/create")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<ProductLine> createProductLine(@RequestBody @Valid ProductLine productLine)
            throws InvalidArgumentException {
        productLine = productLineService.createProductLine(productLine);
        return ResponseEntity.ok(productLine);
    }

    @DeleteMapping(path = "/delete/{productLineId}")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public String deleteProductLine(@PathVariable Long productLineId) {
        productLineService.deleteProductLine(productLineId);
        // System.out.println(productLineId);
        return "";
    }

    @PostMapping(path = "/update")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public String updateProductLine(@RequestBody ProductLine productLine) {
        productLineService.updateProductLine(productLine);
        return "";
    }
}
