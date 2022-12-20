package com.uet.productionmove.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderModel {
    private Long id;

    @NotNull(message = "orderDate cannot be null")
    private LocalDate orderDate;

    @NotNull(message = "customerId cannot be null")
    private Long customerId;
}
