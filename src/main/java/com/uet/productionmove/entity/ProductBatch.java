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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    private LocalDate manufacturingDate;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "factory_id")
    private Factory factory;

    @OneToOne
    @JoinColumn(name = "product_line_id")
    private ProductLine productLine;

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
