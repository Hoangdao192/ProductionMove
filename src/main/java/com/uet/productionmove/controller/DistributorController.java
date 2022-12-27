package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Distributor;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.DistributorModel;
import com.uet.productionmove.service.DistributorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/distributor")
@PreAuthorize("hasAnyAuthority('Admin', 'Distributor', 'Manufacture') and isAuthenticated()")
public class DistributorController {

    private DistributorService distributorService;

    @PostMapping(path = "/create")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<Map<String, Object>> createDistributor(
            @Valid @RequestBody DistributorModel distributorModel) throws InvalidArgumentException {

        Distributor distributor = distributorService.createDistributor(distributorModel);
        return ResponseEntity.ok(Map.of("message", "Create distributor successful",
                "distributor", distributor));
    }

    @PostMapping(path = "/update")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<Map<String, Object>> updateDistributor(
            @Valid @RequestBody DistributorModel distributorModel) throws InvalidArgumentException {

        Distributor distributor = distributorService.updateDistributor(distributorModel);
        return ResponseEntity.ok().body(Map.of(
                "message", "Update distributor successful",
                "distributor", distributor));
    }

    @GetMapping(path = "/list")
    @PreAuthorize("hasAnyAuthority('Admin', 'Manufacture') and isAuthenticated()")
    public ResponseEntity<List<DistributorModel>> getAllDistributor() {
        return ResponseEntity.ok(distributorService.getAllDistributor());
    }

    @DeleteMapping(path = "delete")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<Map<String, Object>> deleteDistributor(@RequestParam Long distributorId)
            throws InvalidArgumentException {
        distributorService.deleteDistributor(distributorId);
        return ResponseEntity.ok(Map.of(
                "message", "Delete warranty center successful.",
                "content", Map.of("id", distributorId)));
    }

    @Autowired
    public void setDistributorService(DistributorService distributorService) {
        this.distributorService = distributorService;
    }
}
