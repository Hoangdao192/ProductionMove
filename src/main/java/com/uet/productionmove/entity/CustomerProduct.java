package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "customer_device")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerProduct {
    @Id
    @Column(name = "product_id")
    private Long productId;
    private LocalDate activationDate;
    private LocalDate warrantyExpiredDate;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToOne(cascade = CascadeType.MERGE)
    @MapsId
    @JoinColumn(name = "product_id")
    private Product product;
}
