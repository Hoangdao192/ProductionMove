package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "batch")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BatchEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "stock_id")
    private StockEntity stock;

    private LocalDate manufacturingDate;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "manufacture_factory_id")
    private FactoryEntity factoryEntity;

    @OneToOne
    @JoinColumn(name = "product_id")
    private ProductLineEntity productLineEntity;

    public BatchEntity(
            StockEntity stock,
            LocalDate manufacturingDate,
            FactoryEntity factoryEntity,
            ProductLineEntity productLineEntity) {
        this.stock = stock;
        this.manufacturingDate = manufacturingDate;
        this.factoryEntity = factoryEntity;
        this.productLineEntity = productLineEntity;
    }
}
