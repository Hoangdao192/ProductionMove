package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Table(name = "factory_stock")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FactoryStockEntity {
    @Id
    @Column(name = "stock_id")
    private UUID stockId;

    @Column(name = "factory_id")
    private UUID factoryId;

    @Column(name = "stock_name")
    private String stockName;
}
