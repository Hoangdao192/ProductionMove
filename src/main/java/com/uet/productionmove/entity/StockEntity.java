package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "stock")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private AddressEntity address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id")
    private UserEntity stockOwner;

    public StockEntity(String name, AddressEntity address, UserEntity stockOwner) {
        this.name = name;
        this.address = address;
        this.stockOwner = stockOwner;
    }
}
