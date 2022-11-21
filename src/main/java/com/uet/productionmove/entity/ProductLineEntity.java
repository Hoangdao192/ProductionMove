package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Entity(name = "product_line")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductLineEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @org.hibernate.annotations.Type(type="uuid-char")
    @Column(name = "id", length = 36)
    private UUID id;
    @Column(name = "name")
    private String name;
}
