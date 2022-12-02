package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "manufacture_factory")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FactoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String name;
    private String phoneNumber;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "adress_id")
    private AddressEntity address;

    public FactoryEntity(UserEntity user, String name, String phoneNumber, AddressEntity address) {
        this.user = user;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}
