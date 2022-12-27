package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "products")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "product_line_id", nullable = false)
    private ProductLine productLine;

    @Column(nullable = false)
    private String status;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "batch_id", nullable = false)
    private ProductBatch batch;
}
