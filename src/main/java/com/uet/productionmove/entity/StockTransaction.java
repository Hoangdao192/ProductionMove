package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "stock_transaction")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "batch_id", nullable = false)
    private ProductBatch batch;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "export_stock_id")
    private Stock exportStock;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "import_stock_id")
    private Stock importStock;

    @Column(nullable = false)
    private String transactionStatus;

    public StockTransaction(ProductBatch batch, Stock exportStock, Stock importStock) {
        this.batch = batch;
        this.exportStock = exportStock;
        this.importStock = importStock;
    }
}
