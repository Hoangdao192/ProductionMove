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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "unit_id", nullable = false, updatable = false,
            foreignKey = @ForeignKey(name = "unit_foreign_key"))
    private Unit unit;

    private String name;
    private String address;
    private String phoneNumber;

    public Distributor(Unit unit, String name, String address, String phoneNumber) {
        this.unit = unit;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
