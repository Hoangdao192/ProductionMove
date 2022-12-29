package com.uet.productionmove.controller;

import com.uet.productionmove.entity.User;
import com.uet.productionmove.model.LoginRequestModel;
import com.uet.productionmove.security.CustomUserDetail;
import com.uet.productionmove.security.JsonWebTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api")
public class AuthenticationController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private JsonWebTokenProvider tokenProvider;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public Map<String, String> authenticateUser(@RequestBody @Valid LoginRequestModel loginRequestModel) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestModel.getUsername(),
                        loginRequestModel.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        System.out.println((User) authentication.getPrincipal());
        // Trả về jwt cho người dùng.
        String jwt = tokenProvider.generateToken((User) authentication.getPrincipal());
        Map<String, String> returnData = new HashMap<>();
        returnData.put("accessToken", jwt);
        returnData.put("tokenType", "Bearer");
        // return new Object() {
        // public String accessToken = jwt;
        // public String tokenType = "Bearer";
        // };
        return returnData;
    }
}
