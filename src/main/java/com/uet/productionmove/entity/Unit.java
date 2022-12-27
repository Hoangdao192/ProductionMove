package com.uet.productionmove.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.uet.productionmove.validator.RoleConstraint;
import lombok.*;
import lombok.ToString.Exclude;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
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

    @JsonManagedReference
    @OneToOne(mappedBy = "unit", cascade = CascadeType.ALL)
    private Factory factory;

    @JsonManagedReference
    @OneToOne(mappedBy = "unit", cascade = CascadeType.ALL)
    private Distributor distributor;

    @JsonManagedReference
    @OneToOne(mappedBy = "unit", cascade = CascadeType.ALL)
    private WarrantyCenter warrantyCenter;

    @JsonManagedReference
    @JsonIgnore
    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL)
    private List<User> users;
}
