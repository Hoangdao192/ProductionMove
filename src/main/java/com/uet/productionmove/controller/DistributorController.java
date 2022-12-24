package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Distributor;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.DistributorModel;
import com.uet.productionmove.service.DistributorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/distributor")
public class DistributorController {

    private DistributorService distributorService;

    @PostMapping(path = "/create")
    public ResponseEntity<Map<String, Object>> createDistributor(
            @Valid @RequestBody DistributorModel distributorModel) throws InvalidArgumentException {

        Distributor distributor = distributorService.createDistributor(distributorModel);
        return ResponseEntity.ok(Map.of("message", "Create distributor successful",
                    "distributor", distributor
                ));
    }

    @PostMapping(path = "/update")
    public ResponseEntity<Map<String, Object>> updateDistributor(
            @Valid @RequestBody DistributorModel distributorModel) throws InvalidArgumentException {

        Distributor distributor = distributorService.updateDistributor(distributorModel);
        return ResponseEntity.ok().body(Map.of(
                "message", "Update distributor successful",
                "distributor", distributor));
    }

    @GetMapping(path = "/list")
    public ResponseEntity<List<DistributorModel>> getAllDistributor() {
        return ResponseEntity.ok(distributorService.getAllDistributor());
    }

    @Autowired
    public void setDistributorService(DistributorService distributorService) {
        this.distributorService = distributorService;
    }
}
