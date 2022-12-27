package com.uet.productionmove.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

import javax.persistence.Column;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductBatchModel {
    private Long id;

    @NotNull(message = "manufacturingDate không thể là null")
    private LocalDate manufacturingDate;

    @NotNull(message = "warrantyPeriod cannot be null")
    private Long warrantyPeriod;

    @NotNull(message = "productLineId không thể là null.")
    private Long productLineId;

    private Long stockId;

    @NotNull(message = "factoryId không thể là null.")
    private Long factoryId;

    @NotNull(message = "productQuantity không thể là null.")
    @Min(value = 0, message = "productQuantity phải lớn hơn 0")
    private Long productQuantity;
}
