package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Factory;
import com.uet.productionmove.entity.WarrantyCenter;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.FactoryModel;
import com.uet.productionmove.model.WarrantyCenterModel;
import com.uet.productionmove.repository.FactoryRepository;
import com.uet.productionmove.service.FactoryService;
import com.uet.productionmove.service.WarrantyCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Controller
public class WarrantyCenterController {

    @Autowired
    private WarrantyCenterService warrantyCenterService;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return new ResponseEntity<>(
                Map.of("errors", errors), HttpStatus.BAD_REQUEST
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(
            InvalidArgumentException ex) {
        return new ResponseEntity<>(
                Map.of("error", ex.getMessage()), HttpStatus.BAD_REQUEST
        );
    }

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
