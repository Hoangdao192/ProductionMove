package com.uet.productionmove.controller;

import com.uet.productionmove.entity.ProductWarranty;
import com.uet.productionmove.entity.WarrantyCenter;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.ProductWarrantyModel;
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
@PreAuthorize("hasAnyAuthority('Admin', 'Warranty center', 'Distributor') and isAuthenticated()")
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

    @GetMapping(path = "get", params = "unitId")
    public ResponseEntity<WarrantyCenter> getWarrantyCenterByUnitId(@RequestParam Long unitId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(warrantyCenterService.getWarrantyCenterByUnitId(unitId));
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
    @PreAuthorize("hasAnyAuthority('Admin', 'Distributor') and isAuthenticated()")
    public ResponseEntity<List<WarrantyCenterModel>> getAllWarrantyCenter() {
        return ResponseEntity.ok(warrantyCenterService.getAllWarrantyCenter());
    }

    @PostMapping(path = "/warranty/create")
    public ResponseEntity<ProductWarranty> createProductWarranty(
            @RequestBody @Valid ProductWarrantyModel productWarrantyModel) throws InvalidArgumentException {
        ProductWarranty productWarranty = warrantyCenterService.createProductWarranty(productWarrantyModel);
        return ResponseEntity.ok(productWarranty);
    }

    @GetMapping(path = "/warranty/list")
    public ResponseEntity<List<ProductWarranty>> getAllProductWarrantyByWarrantyCenterId(
            @RequestParam Long warrantyCenterId
    ) throws InvalidArgumentException {
        List<ProductWarranty> productWarranties = warrantyCenterService.getAllWarrantyByWarrantyCenterId(warrantyCenterId);
        return ResponseEntity.ok(productWarranties);
    }

    @GetMapping(path = "/warranty/request/list")
    public ResponseEntity<List<ProductWarranty>> getAllProductWarrantyRequestByWarrantyCenterId(
            @RequestParam Long warrantyCenterId
    ) throws InvalidArgumentException {
        List<ProductWarranty> productWarranties =
                warrantyCenterService.getAllProductWarrantyRequest(warrantyCenterId);
        return ResponseEntity.ok(productWarranties);
    }

    @PostMapping(path = "/warranty/accept")
    public ResponseEntity<String> acceptWarrantyRequest(@RequestParam Long productWarrantyId)
        throws InvalidArgumentException {
        warrantyCenterService.acceptWarrantyRequest(productWarrantyId);
        return ResponseEntity.ok("Successful");
    }

    @PostMapping(path = "/warranty/finish")
    public ResponseEntity<String> finishWarranty(@RequestParam Long productWarrantyId)
            throws InvalidArgumentException {
        warrantyCenterService.finishWarranty(productWarrantyId);
        return ResponseEntity.ok("Successful");
    }

    @GetMapping(path = "warranty/doing")
    public ResponseEntity<List<ProductWarranty>> getAllDoingProductWarranty(@RequestParam Long warrantyCenterId)
            throws InvalidArgumentException
    {
        return ResponseEntity.ok(warrantyCenterService.getAllDoingProductWarranty(warrantyCenterId));
    }
}
