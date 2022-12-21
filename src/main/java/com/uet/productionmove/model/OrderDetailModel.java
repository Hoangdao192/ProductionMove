package com.uet.productionmove.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailModel {
    private Long id;

    @NotNull(message = "orderId cannot be null.")
    private Long orderId;

    @NotNull(message = "productLineId cannot be null.")
    private Long productLineId;

    @NotNull(message = "quantity cannot be null.")
    @Min(value = 1, message = "quantity must bigger than 0.")
    private Integer quantity;
}
