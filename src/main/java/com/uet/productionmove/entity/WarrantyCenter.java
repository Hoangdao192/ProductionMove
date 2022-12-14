package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "warranty_center")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WarrantyCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    private String address;
    private String phoneNumber;

    public WarrantyCenter(String name, User user, String address, String phoneNumber) {
        this.name = name;
        this.user = user;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
