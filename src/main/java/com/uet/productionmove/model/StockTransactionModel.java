package com.uet.productionmove.model;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockTransactionModel {
    private Long id;

    @NotNull(message = "batchId cannot be null")
    private Long batchId;

    private Long exportStockId;

    private Long importStockId;
}