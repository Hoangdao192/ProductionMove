package com.uet.productionmove.controller;

import com.uet.productionmove.entity.ProductLineEntity;
import com.uet.productionmove.service.ProductLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/product_line")
public class ProductLineController {

    @Autowired
    private ProductLineService productLineService;

    @GetMapping(path = "/list")
    public Page<ProductLineEntity> getAllProductLine(
            @RequestParam int page,
            @RequestParam int perPage
    ) {
        return productLineService.getAllProductLine(page, perPage);
    }

    @PostMapping(path = "/create")
    public String createProductLine(@RequestBody ProductLineEntity productLine) {
        productLineService.insertProductLine(productLine);
        return "";
    }

    @PostMapping(path = "/delete")
    public String deleteProductLine(@RequestParam Long productLineId) {
        productLineService.deleteProductLine(productLineId);
//        System.out.println(productLineId);
        return "";
    }

    @PostMapping(path = "/update")
    public String updateProductLine(@RequestBody ProductLineEntity productLine) {
        productLineService.updateProductLine(productLine);
        return "";
    }
}
