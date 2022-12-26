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
public class ProductBatch {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    private LocalDate manufacturingDate;

    @ManyToOne(cascade = CascadeType.MERGE)
    @Column(nullable = false, updatable = false)
    @JoinColumn(name = "factory_id")
    private Factory factory;

    @ManyToOne
    @Column(nullable = false, updatable = false)
    @JoinColumn(name = "product_line_id")
    private ProductLine productLine;

    @Column(nullable = false)
    private Long productQuantity;

    public ProductBatch(
            Stock stock,
            LocalDate manufacturingDate,
            Factory factory,
            ProductLine productLine) {
        this.stock = stock;
        this.manufacturingDate = manufacturingDate;
        this.factory = factory;
        this.productLine = productLine;
    }
}
