package com.uet.productionmove.entity;

import com.uet.productionmove.model.DistributorModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Table(name = "distributor")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Distributor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    private String address;
    private String phoneNumber;

    public Distributor(String name, User user, String address, String phoneNumber) {
        this.name = name;
        this.user = user;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
