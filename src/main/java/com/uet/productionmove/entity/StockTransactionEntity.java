package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "stock_transaction")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockTransactionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "batch_id")
    private Long batchId;
}
