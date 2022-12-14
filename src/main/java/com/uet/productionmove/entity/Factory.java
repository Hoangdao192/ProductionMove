package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "factory")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Factory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    private String name;
    private String phoneNumber;
    private String address;

    public Factory(User user, String name, String phoneNumber, String address) {
        this.user = user;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}
