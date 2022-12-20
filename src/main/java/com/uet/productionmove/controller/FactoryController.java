package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Factory;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.FactoryModel;
import com.uet.productionmove.service.FactoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/factory")
public class FactoryController {

    private FactoryService factoryService;

    @PostMapping(path = "/create")
    public ResponseEntity<Map<String, Object>> createFactory(
            @Valid @RequestBody FactoryModel factoryModel) throws InvalidArgumentException {

        Factory factory = factoryService.createFactory(factoryModel);
        return ResponseEntity.ok(Map.of("message", "Create factory successful.",
                "factory", factory
        ));
    }

    @PostMapping(path = "/update")
    public ResponseEntity<Map<String, Object>> updateDistributor(
            @Valid @RequestBody FactoryModel factoryModel) throws InvalidArgumentException {

        Factory factory = factoryService.updateFactory(factoryModel);
        return ResponseEntity.ok().body(Map.of(
                "message", "Update factory successful",
                "factory", factory));
    }

    @Autowired
    public void setFactoryService(FactoryService factoryService) {
        this.factoryService = factoryService;
    }
}
