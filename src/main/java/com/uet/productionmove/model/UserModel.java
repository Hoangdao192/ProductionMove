package com.uet.productionmove.model;

import com.uet.productionmove.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel extends User {
    private String name;
    private String phoneNumber;
    private String address;

    public UserModel(User user) {
        this.setId(user.getId());
        this.setRole(user.getRole());
        this.setPassword(user.getPassword());
        this.setUsername(user.getUsername());
    }
}
