package com.uet.productionmove.model;

import com.uet.productionmove.entity.Distributor;
import com.uet.productionmove.entity.Factory;
import com.uet.productionmove.entity.ProductTransactionDetail;
import com.uet.productionmove.entity.Stock;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DistributorProductTransactionModel {
    private Long id;
    private Stock exportStock;
    private Stock importStock;
    private String transactionStatus;
    private List<ProductTransactionDetail> productTransactionDetails;
    private Distributor distributor;

    public DistributorProductTransactionModel(
            Long id, Stock exportStock, Stock importStock, String transactionStatus,
            List<ProductTransactionDetail> productTransactionDetails) {
        this.id = id;
        this.exportStock = exportStock;
        this.importStock = importStock;
        this.transactionStatus = transactionStatus;
        this.productTransactionDetails = productTransactionDetails;
    }
}
