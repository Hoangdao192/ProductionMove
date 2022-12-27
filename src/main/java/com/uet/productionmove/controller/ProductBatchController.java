package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Product;
import com.uet.productionmove.entity.ProductBatch;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.ProductBatchModel;
import com.uet.productionmove.service.ProductBatchService;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/product_batch")
@PreAuthorize("hasAnyAuthority('Admin', 'Distributor', 'Manufacture') and isAuthenticated()")
public class ProductBatchController {

    private ProductBatchService productBatchService;

    @PostMapping(path = "/create")
    @PreAuthorize("hasAnyAuthority('Admin', 'Manufacture') and isAuthenticated()")
    public ResponseEntity<ProductBatch> createProductBatch(@RequestBody @Valid ProductBatchModel productBatchModel)
            throws InvalidArgumentException {
        ProductBatch productBatch = productBatchService.createProductBatch(productBatchModel);
        return ResponseEntity.ok(productBatch);
    }

    @GetMapping(path = "/list")
    @PreAuthorize("hasAnyAuthority('Admin', 'Manufacture') and isAuthenticated()")
    public ResponseEntity<List<ProductBatch>> getAllProductBatch(@RequestParam Long factoryId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(productBatchService.getAllProductBatchByFactoryId(factoryId));
    }

    @GetMapping(path = "/list/not_import")
    @PreAuthorize("hasAnyAuthority('Admin', 'Manufacture') and isAuthenticated()")
    public ResponseEntity<List<ProductBatch>> getAllProductBatchNotImported(@RequestParam Long factoryId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(productBatchService.getAllProductBatchNotImported());
    }

    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    @DeleteMapping(path = "/delete")
    public String deleteProductBatch(@RequestParam Long productBatchId) {
        productBatchService.deleteProductBatch(productBatchId);
        return "";
    }

    @GetMapping(path = "/product/list")
    public ResponseEntity<List<Product>> getAllProductByProductBatchId(@RequestParam Long productBatchId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(productBatchService.getAllProductByProductBatchId(productBatchId));
    }

    @Autowired
    public void setProductBatchService(ProductBatchService productBatchService) {
        this.productBatchService = productBatchService;
    }
}
