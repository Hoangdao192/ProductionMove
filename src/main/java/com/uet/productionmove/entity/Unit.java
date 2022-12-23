package com.uet.productionmove.entity;

import com.uet.productionmove.validator.RoleConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "units")
@Entity
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull(message = "Unit type cannot be null")
    @NotEmpty(message = "Unit type cannot be empty")
    @RoleConstraint
    @Column(nullable = false)
    private String type;

    @OneToOne(mappedBy = "unit", cascade = CascadeType.ALL)
    private Factory factory;

    @OneToOne(mappedBy = "unit", cascade = CascadeType.ALL)
    private Distributor distributor;

    @OneToOne(mappedBy = "unit", cascade = CascadeType.ALL)
    private WarrantyCenter warrantyCenter;

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL)
    private List<User> users;
}
