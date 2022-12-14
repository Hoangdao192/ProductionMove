package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Distributor;
import com.uet.productionmove.exception.user.DistributorNotExistsException;
import com.uet.productionmove.exception.user.UserNotExistsException;
import com.uet.productionmove.model.DistributorModel;
import com.uet.productionmove.service.DistributorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/distributor")
public class DistributorController {

    @Autowired
    private DistributorService distributorService;

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

    @PostMapping(path = "/create")
    public ResponseEntity<Map<String, Object>> createDistributor(@Valid @RequestBody DistributorModel distributorModel) {
        try {
            Distributor distributor = distributorService.createDistributor(distributorModel);
            return ResponseEntity.ok(Map.of("message", "Create distributor successful",
                        "distributor", distributor
                    ));
        }
        catch (UserNotExistsException exception) {
            return ResponseEntity.badRequest().body(Map.of("error" , exception.getMessage()));
        }
    }

    @PostMapping(path = "/update")
    public ResponseEntity<Map<String, Object>> updateDistributor(@Valid @RequestBody DistributorModel distributorModel) {
        try {
            Distributor distributor = distributorService.updateDistributor(distributorModel);
            return ResponseEntity.ok().body(Map.of(
                    "message", "Update distributor successful",
                    "distributor", distributor));
        }
        catch (UserNotExistsException | DistributorNotExistsException exception) {
            return ResponseEntity.badRequest().body(Map.of("error" , exception.getMessage()));
        }
    }
}
