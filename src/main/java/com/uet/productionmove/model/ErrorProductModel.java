package com.uet.productionmove.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorProductModel {
    @NotNull(message = "productId cannot be null.")
    private Long productId;

    @NotNull(message = "factoryId cannot be null.")
    private Long factoryId;

    @NotNull(message = "warrantyCenterId cannot be null.")
    private Long warrantyCenterId;

    @NotNull(message = "error cannot be null.")
    @NotEmpty(message = "error cannot be empty.")
    private String error;
}
