package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Table(name = "products")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @org.hibernate.annotations.Type(type="uuid-char")
    @Column(name = "id")
    private UUID id;

    @Column(name = "product_code", length = 100, unique = true)
    private String productCode;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_line_id")
    private UUID productLineId;
}
