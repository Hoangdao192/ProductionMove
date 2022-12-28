package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "product_warranty")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductWarranty {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "customer_product_id", nullable = false)
    private CustomerProduct customerProduct;

    private LocalDate startWarrantyDate;
    private LocalDate endWarrantyDate;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "warranty_center_id", nullable = false)
    private WarrantyCenter warrantyCenter;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "distributor_id", nullable = false)
    private Distributor requestWarrantyDistributor;

    @Column(nullable = false)
    private String status;

    private String description;
}
