package com.uet.productionmove.model;

import com.uet.productionmove.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel extends UserEntity {
    private String name;
    private String phoneNumber;
    private String address;

    public UserModel(UserEntity userEntity) {
        this.setId(userEntity.getId());
        this.setRole(userEntity.getRole());
        this.setPassword(userEntity.getPassword());
        this.setUsername(userEntity.getUsername());
    }
}
