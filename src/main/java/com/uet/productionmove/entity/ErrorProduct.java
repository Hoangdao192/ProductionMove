package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "error_products")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorProduct {
    @Id
    @Column(name = "product_id")
    private Long productId;

    @OneToOne(cascade = CascadeType.MERGE)
    @MapsId
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "factory_id")
    private Factory factory;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "warranty_center_id")
    private WarrantyCenter warrantyCenter;

    private String error;
}
