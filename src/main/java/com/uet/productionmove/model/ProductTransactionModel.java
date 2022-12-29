package com.uet.productionmove.model;

import com.uet.productionmove.validator.NotEmptyList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductTransactionModel {
    private Long id;

    @NotNull(message = "productIds cannot be null.")
    @NotEmptyList(message = "productIds cannot be empty.")
    private List<Long> productIds;

    @NotNull(message = "importStockId cannot be null")
    private Long importStockId;

    private Long exportStockId;

    private String transactionStatus;
}
