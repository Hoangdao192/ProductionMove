package com.uet.productionmove.model;

import com.uet.productionmove.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FactoryModel {
    private Long id;

    @NotBlank(message = "name must not be empty")
    @NotNull(message = "name must not be null")
    private String name;

    @NotBlank(message = "userId must not be empty")
    @NotNull(message = "userId must not be null")
    private String userId;

    @NotBlank(message = "address must not be empty")
    @NotNull(message = "address must not be null")
    private String address;

    @NotBlank(message = "phoneNumber must not be empty")
    @NotNull(message = "phoneNumber must not be null")
    @Pattern(regexp = "^\\d{10}$", message = "Phone number is invalid")
    private String phoneNumber;

    public FactoryModel(String name, String userId, String address, String phoneNumber) {
        this.name = name;
        this.userId = userId;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
