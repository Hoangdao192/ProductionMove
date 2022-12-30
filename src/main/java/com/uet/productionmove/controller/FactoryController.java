package com.uet.productionmove.controller;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.*;
import com.uet.productionmove.service.FactoryService;
import com.uet.productionmove.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/factory")
@PreAuthorize("hasAnyAuthority('Admin', 'Manufacture', 'Distributor', 'Warranty center') and isAuthenticated()")
public class FactoryController {

    private FactoryService factoryService;
    private ProductService productService;

    @PostMapping(path = "/create")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<Map<String, Object>> createFactory(
            @Valid @RequestBody FactoryModel factoryModel) throws InvalidArgumentException {

        Factory factory = factoryService.createFactory(factoryModel);
        return ResponseEntity.ok(Map.of("message", "Create factory successful.",
                "factory", factory));
    }

    @PostMapping(path = "/update")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<Map<String, Object>> updateFactory(
            @Valid @RequestBody FactoryModel factoryModel) throws InvalidArgumentException {

        Factory factory = factoryService.updateFactory(factoryModel);
        return ResponseEntity.ok().body(Map.of(
                "message", "Update factory successful",
                "factory", factory));
    }

    @PostMapping(path = "/stock/import")
    public ResponseEntity<String> importProducedBatchIntoStock(
            @RequestParam Long factoryId, @RequestParam Long batchId) throws InvalidArgumentException {
        factoryService.importProducedBatchIntoStock(factoryId, batchId);
        return ResponseEntity.ok("Import stock successful");
    }

    @PostMapping(path = "/stock/export")
    public ResponseEntity<String> exportBatchToDistributor(@RequestBody @Valid FactoryExportModel factoryExportModel)
            throws InvalidArgumentException {
        factoryService.exportBatchToDistributor(factoryExportModel);
        return ResponseEntity.ok("Export successful");
    }

    @GetMapping(path = "/get", params = "factoryId")
    public ResponseEntity<Factory> getFactoryById(@RequestParam Long factoryId) throws InvalidArgumentException {
        Factory factory = factoryService.getFactoryById(factoryId);
        return ResponseEntity.ok(factory);
    }

    @GetMapping(path = "/get", params = "unitId")
    public ResponseEntity<Factory> getByUnitId(@RequestParam Long unitId) throws InvalidArgumentException {
        return ResponseEntity.ok(factoryService.getFactoryByUnitId(unitId));
    }

    @GetMapping(path = "/stock/batch/list", params = "factoryId")
    public ResponseEntity<List<ProductBatch>> getProductBatchInStock(@RequestParam Long factoryId)
            throws InvalidArgumentException {
        List<ProductBatch> productBatchs = factoryService.getAllProductBatchInStock(factoryId);
        return ResponseEntity.ok(productBatchs);
    }
    
    @GetMapping(path = "/stock/batch/notImport")
    public ResponseEntity<List<ProductBatch>> getProductBatchNotImport(@RequestParam Long factoryId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(factoryService.getAllProductBatchNotImport(factoryId));
    }

    @GetMapping(path = "list")
    public ResponseEntity<List<FactoryModel>> getAllFactory() {
        return ResponseEntity.ok(factoryService.getAllFactory());
    }

    @GetMapping(path = "/stock/product/list")
    public ResponseEntity<List<Product>> getAllProductInStock(
            @RequestParam Long factoryId
    ) throws InvalidArgumentException {
        return ResponseEntity.ok(factoryService.getAllProductInStock(factoryId));
    }

    @GetMapping(path = "/stock/product/list", params = {"factoryId", "status"})
    public ResponseEntity<List<Product>> getAllProductInStockFilter(
            @RequestParam Long factoryId, @RequestParam String status
    ) throws InvalidArgumentException {
        return ResponseEntity.ok(factoryService.getAllProductInStock(factoryId));
    }
    @GetMapping(path = "/stock/product/list/exportable")
    public ResponseEntity<List<Product>> getAllProductExportableInStock(
            @RequestParam Long factoryId
    ) throws InvalidArgumentException {
        return ResponseEntity.ok(factoryService.getAllExportableProductInStock(factoryId));
    }

    @PostMapping(path = "stock/product/errorReturn")
    public ResponseEntity<String> returnErrorWarrantyToFactory(@RequestParam Long productWarrantyId)
        throws InvalidArgumentException {
        factoryService.returnErrorWarrantyFactory(productWarrantyId);
        return ResponseEntity.ok("Success");
    }

    @PostMapping(path = "/stock/product/export")
    public ResponseEntity<ProductTransaction> exportProductsToDistributor(
            @RequestBody @Valid FactoryExportProductModel factoryExportProductModel)
            throws InvalidArgumentException {
        ProductTransaction productTransaction =
                factoryService.exportProductsToDistributor(factoryExportProductModel);
        return ResponseEntity.ok(productTransaction);
    }

    @GetMapping(path = "/stock/product/incoming")
    public ResponseEntity<List<DistributorProductTransactionModel>> getAllIncomingProductTransaction(
            @RequestParam Long factoryId
    ) throws InvalidArgumentException {
        return ResponseEntity.ok(factoryService.getAllInComingProductTransaction(factoryId));
    }

    @PostMapping(path = "/stock/product/import")
    public ResponseEntity<String> importProductTransaction(
            @RequestParam Long productTransactionId
    ) throws InvalidArgumentException {
        factoryService.importProductTransaction(productTransactionId);
        return ResponseEntity.ok("Success");
    }

    @GetMapping(path = "productStatistic")
    public ResponseEntity<Map<String, Long>> getFactoryProductStatistic() {
        return ResponseEntity.ok(productService.getProductPerFactoryStatistic());
    }

    @GetMapping(path = "productStatusStatistic")
    public ResponseEntity<Map<String, Long>> getFactoryProductStatusStatistic(
            @RequestParam Long factoryId
    ) throws InvalidArgumentException {
        return ResponseEntity.ok(factoryService.getProductStatusStatistic(factoryId));
    }

    @GetMapping(path = "productStatistic/perMonth")
    public ResponseEntity<Map<String, Long>> getProductStatisticPerMonth(
            @RequestParam int year, @RequestParam Long factoryId)
        throws InvalidArgumentException {
        return ResponseEntity.ok(factoryService.getProductPerMonthStatistic(year, factoryId));
    }

    @GetMapping(path = "productStatistic/perQuarter")
    public ResponseEntity<Map<String, Long>> getProductStatisticPerQuarter(
            @RequestParam int year, @RequestParam Long factoryId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(factoryService.getProductPerQuarterStatistic(year, factoryId));
    }

    @GetMapping(path = "productStatistic/error/line")
    public ResponseEntity<Map<String, Long>> getProductErrorStatisticPerLine(
            @RequestParam Long factoryId
    ) throws InvalidArgumentException {
        return ResponseEntity.ok(factoryService.getErrorProductStatisticPerLine(factoryId));
    }

    @GetMapping(path = "productStatistic/error/warranty")
    public ResponseEntity<Map<String, Long>> getProductErrorStatisticPerWarranty(
            @RequestParam Long factoryId
    ) throws InvalidArgumentException {
        return ResponseEntity.ok(factoryService.getErrorProductStatisticPerWarrantyCenter(factoryId));
    }

    @GetMapping(path = "productStatistic/perYear")
    public ResponseEntity<Map<String, Long>> getProductStatisticPerYear(
            @RequestParam Long factoryId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(factoryService.getProductPerYearStatistic(factoryId));
    }

    @GetMapping(path = "/stock/product/errorList")
    public ResponseEntity<List<ErrorProduct>> getAllErrorProductInStock(
            @RequestParam Long factoryId
    ) throws InvalidArgumentException {
        return ResponseEntity.ok(factoryService.getAllErrorProductInStock(factoryId));
    }

    @DeleteMapping(path = "delete")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<Map<String, Object>> deleteFactory(@RequestParam Long factoryId)
            throws InvalidArgumentException {
        factoryService.deleteFactoryById(factoryId);
        return ResponseEntity.ok(Map.of(
                "message", "Delete factory successful",
                "content", Map.of("id", factoryId)));
    }

    @Autowired
    public void setFactoryService(FactoryService factoryService) {
        this.factoryService = factoryService;
    }

    @Autowired
    public void setProductService(ProductService productService) {
        this.productService = productService;
    }
}
