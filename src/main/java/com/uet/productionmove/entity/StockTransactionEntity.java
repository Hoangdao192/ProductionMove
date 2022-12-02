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
public class StockTransactionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "batch_id")
    private BatchEntity batch;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "export_stock_id")
    private StockEntity exportStock;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "import_stock_id")
    private StockEntity importStock;
}
