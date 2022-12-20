package com.uet.productionmove.controller;

import com.uet.productionmove.entity.WarrantyCenter;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.WarrantyCenterModel;
import com.uet.productionmove.service.WarrantyCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping(path = "api/warranty")
public class WarrantyCenterController {

    @Autowired
    private WarrantyCenterService warrantyCenterService;

    @PostMapping(path = "/create")
    public ResponseEntity<Map<String, Object>> createWarrantyCenter(
            @Valid @RequestBody WarrantyCenterModel warrantyCenterModel)
            throws InvalidArgumentException {
        WarrantyCenter warrantyCenter = warrantyCenterService.createWarrantyCenter(warrantyCenterModel);
        return ResponseEntity.ok(Map.of("message", "Create warranty center successful.",
                "warrantyCenter", warrantyCenter
        ));
    }

    @PostMapping(path = "/update")
    public ResponseEntity<Map<String, Object>> updateWarrantyCenter(
            @Valid @RequestBody WarrantyCenterModel warrantyCenterModel)
            throws InvalidArgumentException {
        WarrantyCenter warrantyCenter = warrantyCenterService.updateWarrantyCenter(warrantyCenterModel);
        return ResponseEntity.ok().body(Map.of(
                "message", "Update warranty center successful",
                "warrantyCenter", warrantyCenter));
    }

}
