package com.uet.productionmove.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerModel {
    private Long id;

    @NotNull(message = "First name cannot be null.")
    @NotEmpty(message = "firstName cannot be empty.")
    @Length(min = 1, max = 255, message = "First name length must less than 255.")
    private String firstName;

    @NotNull(message = "Last name cannot be null.")
    @NotEmpty(message = "lastName cannot be empty.")
    @Length(max = 255, min = 1, message = "Last name length must less than 255.")
    private String lastName;

    @NotBlank(message = "phoneNumber must not be empty")
    @NotNull(message = "phoneNumber must not be null")
    @Length(min = 3, max = 20, message = "phoneNumber length must <= 20 and >= 3.")
    @Pattern(regexp = "^\\d+", message = "Phone number is invalid")
    private String phoneNumber;

    @NotBlank(message = "address must not be empty")
    @NotNull(message = "address must not be null")
    private String address;

    @NotNull(message = "distributorId cannot be null.")
    private Long distributorId;
}
