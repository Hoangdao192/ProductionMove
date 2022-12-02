package com.uet.productionmove.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductBatchModel {
    private LocalDate manufacturingDate;
    private UUID userId;
    private Long productLineId;
    private Long stockId;
}
