package com.uet.productionmove.controller;

import com.uet.productionmove.model.ProductBatchModel;
import com.uet.productionmove.service.ProductBatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/product_batch")
public class ProductBatchController {

    @Autowired
    private ProductBatchService productBatchService;

    @PostMapping(path = "/create")
    public String createProductBatch(@RequestBody ProductBatchModel productBatch) {
        productBatchService.insertProductBatch(productBatch);
        return "";
    }

    public String deleteProductBatch(@RequestParam Long productBatchId) {
        productBatchService.deleteProductBatch(productBatchId);
        return "";
    }

}
