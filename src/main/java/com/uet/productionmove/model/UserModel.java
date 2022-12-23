package com.uet.productionmove.model;

import com.uet.productionmove.entity.User;
import com.uet.productionmove.validator.RoleConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {

    private String id;

    @NotNull(message = "unitId cannot be null")
    private Long unitId;

    @NotNull(message = "Username must not be null")
    @NotBlank(message = "Username must not be empty")
    @Length(min = 5, message = "Username must be equal or more than 8 characters")
    private String username;

    @NotNull(message = "Password must not be null")
    @NotBlank(message = "Password must not be empty")
    @Length(min = 8, message = "Password's length must be equal or greater then 8")
    private String password;

    @NotNull(message = "Role must not be null")
    @NotBlank(message = "Role must not be empty")
    @RoleConstraint(message = "Invalid user role")
    private String role;
}
