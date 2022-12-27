package com.uet.productionmove.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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
    @JoinColumn(name = "unit_id", nullable = false, updatable = false, foreignKey = @ForeignKey(name = "unit_foreign_key"))
    private Unit unit;

    private String name;
    private String phoneNumber;
    private String address;

    @OneToMany(mappedBy = "factory", cascade = CascadeType.ALL)
    @JsonIgnore
    // @JsonBackReference
    private List<ProductBatch> createdProductBatchs = new ArrayList<>();

    public Factory(Unit unit, String name, String phoneNumber, String address) {
        this.unit = unit;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}
