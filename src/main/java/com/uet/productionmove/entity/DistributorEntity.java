package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "distributor")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DistributorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private AddressEntity address;
    private String phoneNumber;

    public DistributorEntity(String name, UserEntity user, AddressEntity address, String phoneNumber) {
        this.name = name;
        this.user = user;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}