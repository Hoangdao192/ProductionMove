package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

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

    @Column(nullable = false)
    private LocalDate manufacturingDate;

    @Column(nullable = false)
    private Long warrantyPeriod;

    @ManyToOne(cascade = CascadeType.MERGE)
    // @JsonBackReference
    @JoinColumn(name = "factory_id", nullable = false, updatable = false)
    private Factory factory;

    @ManyToOne
    // @JsonBackReference
    @JoinColumn(name = "product_line_id", nullable = false, updatable = false)
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
