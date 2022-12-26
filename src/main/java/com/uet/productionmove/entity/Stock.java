package com.uet.productionmove.entity;

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
    private String name;

    private String address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id")
    private User stockOwner;

    @OneToMany(mappedBy = "stock")
    @JsonManagedReference
    private List<ProductBatch> productBatchs = new ArrayList<>();

    public Stock(String name, String address, User stockOwner) {
        this.name = name;
        this.address = address;
        this.stockOwner = stockOwner;
    }
}
