package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Distributor;
import com.uet.productionmove.entity.Factory;
import com.uet.productionmove.entity.User;
import com.uet.productionmove.entity.WarrantyCenter;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.ResponseModel;
import com.uet.productionmove.model.UserModel;
import com.uet.productionmove.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/account/")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "create")
    public ResponseEntity<Map<String, Object>> createUser(@Valid @RequestBody UserModel userModel)
        throws InvalidArgumentException {

        User user = userService.createUser(userModel);
        return ResponseEntity.ok(Map.of("message", "Create user successful",
                "content" , Map.of("user", user)));
    }

    @PostMapping(path = "update")
    public Object updateAccount(@RequestBody @Valid UserModel userModel) throws InvalidArgumentException {
        User user = userService.updateUser(userModel);
        return ResponseEntity.ok(Map.of("message", "Update user successful",
                "content" , Map.of("user", user)));
    }

    @PostMapping(path = "delete")
    public ResponseEntity deleteAccount(@RequestParam String userId) throws InvalidArgumentException {
        userService.deleteUser(userId);
        return ResponseEntity.ok("Delete user successful.");
    }

    @GetMapping(path = "get", params = "userId")
    public ResponseEntity<Map<String, Object>> getUserById(
            @RequestParam @Valid
            @NotNull(message = "userId cannot be null.")
            String userId)
        throws InvalidArgumentException {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Get user successful.",
                "content", Map.of("user", user)));
    }

    @GetMapping(path = "get", params = "username")
    public ResponseEntity<Map<String, Object>> getUserByUsername(
            @RequestParam @Valid
            @NotNull(message = "username cannot be null.")
            String username) throws InvalidArgumentException {
        User user = userService.getUserByUsername(username);

        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Get user successful.",
                "content", Map.of("user", user)));
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
