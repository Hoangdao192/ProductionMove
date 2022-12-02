package com.uet.productionmove.controller;

import com.uet.productionmove.entity.AddressEntity;
import com.uet.productionmove.entity.UserEntity;
import com.uet.productionmove.model.ResponseModel;
import com.uet.productionmove.model.UserModel;
import com.uet.productionmove.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/account/")
public class AccountController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "create")
    public Object createAccount(@RequestBody Map<String, Object> data) {
        UserEntity newUser = userService.createAccount(
                (String) data.get("username"),
                (String) data.get("password"),
                (String) data.get("type")
        );

        if (newUser != null) {
            userService.createAccountInformation(
                    newUser, (String) data.get("type"),
                    (String) data.get("name"),
                    (String) data.get("phoneNumber"),
                    new AddressEntity()
            );

            return new Object() {
                public String status = "success";
                public String message = "Tạo tài khoản thành công";
            };
        }

        return new Object() {
                public String status = "failed";
                public String message = "Tạo tài khoản không thành công";
            };
    }

    @GetMapping(path = "list")
    public ResponseModel getAccountList(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size
    ) {
        List<UserModel> userModels = new ArrayList<>();
        userModels = userService.getAllUser(page, size);

        ResponseModel responseModel = new ResponseModel("success", "", Map.of("users", userModels));
        return responseModel;
    }
}
