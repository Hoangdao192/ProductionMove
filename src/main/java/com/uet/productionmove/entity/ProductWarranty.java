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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private Product product;

    private LocalDate startWarrantyDate;
    private LocalDate endWarrantyDate;

    private String description;
}
