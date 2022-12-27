package com.uet.productionmove.controller;

import com.uet.productionmove.entity.WarrantyCenter;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.WarrantyCenterModel;
import com.uet.productionmove.service.WarrantyCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/warranty")
@PreAuthorize("hasAnyAuthority('Admin', 'Warranty center') and isAuthenticated()")
public class WarrantyCenterController {

    @Autowired
    private WarrantyCenterService warrantyCenterService;

    @PostMapping(path = "/create")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<Map<String, Object>> createWarrantyCenter(
            @Valid @RequestBody WarrantyCenterModel warrantyCenterModel)
            throws InvalidArgumentException {
        WarrantyCenter warrantyCenter = warrantyCenterService.createWarrantyCenter(warrantyCenterModel);
        return ResponseEntity.ok(Map.of("message", "Create warranty center successful.",
                "warrantyCenter", warrantyCenter));
    }

    @PostMapping(path = "/update")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<Map<String, Object>> updateWarrantyCenter(
            @Valid @RequestBody WarrantyCenterModel warrantyCenterModel)
            throws InvalidArgumentException {
        WarrantyCenter warrantyCenter = warrantyCenterService.updateWarrantyCenter(warrantyCenterModel);
        return ResponseEntity.ok().body(Map.of(
                "message", "Update warranty center successful",
                "warrantyCenter", warrantyCenter));
    }

    @DeleteMapping(path = "delete")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<Map<String, Object>> deleteWarrantyCenter(@RequestParam Long warrantyCenterId)
            throws InvalidArgumentException {
        warrantyCenterService.deleteWarrantyCenter(warrantyCenterId);
        return ResponseEntity.ok(Map.of(
                "message", "Delete warranty center successful.",
                "content", Map.of("id", warrantyCenterId)));
    }

    @GetMapping(path = "/list")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<List<WarrantyCenterModel>> getAllWarrantyCenter() {
        return ResponseEntity.ok(warrantyCenterService.getAllWarrantyCenter());
    }

}
