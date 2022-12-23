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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "unit_id", updatable = false, nullable = false,
            foreignKey = @ForeignKey(name = "unit_foreign_key")
    )
    private Unit unit;

    private String name;
    private String address;
    private String phoneNumber;

    public WarrantyCenter(Unit unit, String name, String address, String phoneNumber) {
        this.unit = unit;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
