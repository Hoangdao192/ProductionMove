package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Factory;
import com.uet.productionmove.entity.ProductBatch;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.FactoryExportModel;
import com.uet.productionmove.model.FactoryModel;
import com.uet.productionmove.service.FactoryService;
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
@PreAuthorize("hasAnyAuthority('Admin', 'Manufacture') and isAuthenticated()")
public class FactoryController {

    private FactoryService factoryService;

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

    @GetMapping(path = "get", params = "factoryId")
    public ResponseEntity<Factory> getFactoryById(@RequestParam Long factoryId) throws InvalidArgumentException {
        Factory factory = factoryService.getFactoryById(factoryId);
        return ResponseEntity.ok(factory);
    }

    @GetMapping(path = "/stock/batch/list", params = "factoryId")
    public ResponseEntity<List<ProductBatch>> getProductBatchInStock(@RequestParam Long factoryId)
            throws InvalidArgumentException {
        List<ProductBatch> productBatchs = factoryService.getAllProductBatchInStock(factoryId);
        return ResponseEntity.ok(productBatchs);
    }

    @GetMapping(path = "list")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<List<FactoryModel>> getAllFactory() {
        return ResponseEntity.ok(factoryService.getAllFactory());
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
}
