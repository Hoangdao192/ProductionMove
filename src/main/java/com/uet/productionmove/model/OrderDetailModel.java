package com.uet.productionmove.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailModel {
    private Long id;

    private Long orderId;

    @NotNull(message = "productLineId cannot be null.")
    private Long productLineId;

    @NotNull(message = "productId cannot be null")
    private Long productId;

    @NotNull(message = "quantity cannot be null.")
    @Min(value = 1, message = "quantity must bigger than 0.")
    @Max(value = 1, message = "quantity must be 1.")
    private Integer quantity;
}
