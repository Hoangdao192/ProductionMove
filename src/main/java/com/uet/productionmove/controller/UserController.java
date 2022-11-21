package com.uet.productionmove.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "users")
public class UserController {

    @RequestMapping(path = "/get")
    public String getUserById() {
        return "HELLO";
    }
}
