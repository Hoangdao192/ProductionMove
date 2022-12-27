package com.uet.productionmove.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Table(name = "stock")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit stockOwner;

    @OneToMany(mappedBy = "stock")
    @JsonIgnore
    private List<ProductBatch> productBatchs = new ArrayList<>();

    public Stock(String name, String address, Unit stockOwner) {
        this.name = name;
        this.address = address;
        this.stockOwner = stockOwner;
    }
}
