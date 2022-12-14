package com.uet.productionmove.controller;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.user.UsernameExistsException;
import com.uet.productionmove.model.ResponseModel;
import com.uet.productionmove.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping(path = "api/account/")
public class UserController {

    @Autowired
    private UserService userService;

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

    @PostMapping(path = "create")
    public ResponseEntity<Map<String, Object>> createUser(@Valid @RequestBody User user) {
        try {
            user = userService.createUser(user);
        } catch (UsernameExistsException e) {
            return new ResponseEntity<>(Map.of("errors", e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(Map.of("message", "Create user successful", "id", user.getId()),
                HttpStatus.ACCEPTED);
    }

    @PostMapping(path = "update")
    public Object updateAccount(@RequestBody User user) {
        if (userService.updateUser(user) != null) {
            return new ResponseModel("success", "Update user data successful");
        }
        return new ResponseModel("failed", "Cannot update user data");
    }

    @PostMapping(path = "/distributor/update")
    public ResponseModel updateDistributor(@RequestBody Distributor distributor) {
        if (userService.updateDistributor(distributor) != null) {
            return new ResponseModel(ResponseModel.STATUS_SUCCESS, "Update distributor successful");
        }
        return new ResponseModel(ResponseModel.STATUS_FAIL, "Update distributor failed");
    }

    @PostMapping(path = "/factory/update")
    public ResponseModel updateFactory(@RequestBody Factory factory) {
        if (userService.updateFactory(factory) != null) {
            return new ResponseModel(ResponseModel.STATUS_SUCCESS, "Update factory successful");
        }
        return new ResponseModel(ResponseModel.STATUS_FAIL, "Update factory failed");
    }

    @PostMapping(path = "/warranty/update")
    public ResponseModel updateWarrantyCenter(@RequestBody WarrantyCenter warrantyCenter) {
        if (userService.updateWarrantyCenter(warrantyCenter) != null) {
            return new ResponseModel(ResponseModel.STATUS_SUCCESS, "Update warranty center successful");
        }
        return new ResponseModel(ResponseModel.STATUS_FAIL, "Update warranty center failed");
    }

    @PostMapping(path = "delete")
    public ResponseModel deleteAccount(@RequestParam String userId) {
        if (userService.deleteUser(userId)) {
            return new ResponseModel(ResponseModel.STATUS_SUCCESS, "Delete user successful");
        }
        return new ResponseModel(ResponseModel.STATUS_FAIL, "Delete user failed");
    }

    @GetMapping(path = "get")
    public ResponseModel getUser(@RequestParam String userId) {
        Optional<User> userEntity = userService.getUserById(userId);
        if (userEntity.isPresent()) {
            return new ResponseModel("success", "Get user successful", Map.of("user", userEntity));
        }
        return new ResponseModel("failed", "Get user failed", new HashMap<>());
    }

    @GetMapping(path = "distributor/get")
    public ResponseModel getDistributorByUser(@RequestParam String userId) {
        Optional<Distributor> distributor = userService.getDistributorByUser(userId);
        if (distributor.isPresent()) {
            return new ResponseModel("success", "Get distributor successful",
                    Map.of("distributor", distributor.get()));
        }
        return new ResponseModel(ResponseModel.STATUS_FAIL, "Get distributor failed");
    }

    @GetMapping(path = "factory/get")
    public ResponseModel getFactoryByUser(@RequestParam String userId) {
        Optional<Factory> factory = userService.getFactoryByUser(userId);
        if (factory.isPresent()) {
            return new ResponseModel("success", "Get factory successful",
                    Map.of("factory", factory.get()));
        }
        return new ResponseModel(ResponseModel.STATUS_FAIL, "Get factory failed");
    }

    @GetMapping(path = "warranty/get")
    public ResponseModel getWarrantyCenterByUser(@RequestParam String userId) {
        Optional<WarrantyCenter> warrantyCenter = userService.getWarrantyCenterByUser(userId);
        if (warrantyCenter.isPresent()) {
            return new ResponseModel("success", "Get warranty center successful",
                    Map.of("warranty", warrantyCenter.get()));
        }
        return new ResponseModel(ResponseModel.STATUS_FAIL, "Get warranty center failed");
    }

    @GetMapping(path = "list")
    public ResponseModel getAccountList(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size
    ) {
        Page<User> userEntities = userService.getAllUser(page, size);

        ResponseModel responseModel = new ResponseModel(
                "success", "",
                Map.of(
                        "users", userEntities.toList(),
                        "page", userEntities.getPageable().getPageNumber(),
                        "pageSize", userEntities.getPageable().getPageSize(),
                        "pageOffset", userEntities.getPageable().getOffset(),
                        "totalPage", userEntities.getTotalPages()
                ));
        return responseModel;
    }
}
