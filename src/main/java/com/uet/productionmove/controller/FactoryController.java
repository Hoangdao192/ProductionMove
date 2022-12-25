package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Factory;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.FactoryModel;
import com.uet.productionmove.service.FactoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/factory")
public class FactoryController {

    private FactoryService factoryService;

    @PostMapping(path = "/create")
    public ResponseEntity<Map<String, Object>> createFactory(
            @Valid @RequestBody FactoryModel factoryModel) throws InvalidArgumentException {

        Factory factory = factoryService.createFactory(factoryModel);
        return ResponseEntity.ok(Map.of("message", "Create factory successful.",
                "factory", factory));
    }

    @PostMapping(path = "/update")
    public ResponseEntity<Map<String, Object>> updateFactory(
            @Valid @RequestBody FactoryModel factoryModel) throws InvalidArgumentException {

        Factory factory = factoryService.updateFactory(factoryModel);
        return ResponseEntity.ok().body(Map.of(
                "message", "Update factory successful",
                "factory", factory));
    }

    @GetMapping(path = "get", params = "factoryId")
    public ResponseEntity<Factory> getFactoryById(@RequestParam Long factoryId) throws InvalidArgumentException {
        Factory factory = factoryService.getFactoryById(factoryId);
        return ResponseEntity.ok(factory);
    }

    @GetMapping(path = "list")
    public ResponseEntity<List<FactoryModel>> getAllFactory() {
        return ResponseEntity.ok(factoryService.getAllFactory());
    }

    @DeleteMapping(path = "delete")
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
