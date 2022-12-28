package com.uet.productionmove.model;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductWarrantyModel {
    private Long id;

    @NotNull(message = "productId cannot be null.")
    private Long productId;

    @NotNull(message = "startWarrantyDate cannot be null.")
    private LocalDate startWarrantyDate;

    private LocalDate endWarrantyDate;

    @NotNull(message = "warrantyCenterId cannot be null.")
    private Long warrantyCenterId;

    private String description;
}
