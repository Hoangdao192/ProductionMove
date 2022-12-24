package com.uet.productionmove.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference
    @JoinColumn(
            name = "unit_id", nullable = false, updatable = false,
            foreignKey = @ForeignKey(name = "unit_foreign_key"))
    private Unit unit;

    private String name;
    private String phoneNumber;
    private String address;

    public Factory(Unit unit, String name, String phoneNumber, String address) {
        this.unit = unit;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}
