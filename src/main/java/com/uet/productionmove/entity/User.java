package com.uet.productionmove.entity;

import com.uet.productionmove.validator.UniqueUsername;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;

import com.uet.productionmove.validator.RoleConstraint;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type = "uuid-char")
    private UUID id;

    @NotNull(message = "Username must not be null")
    @NotBlank(message = "Username must not be empty")
    @Length(min = 5, message = "Username must be equal or more than 8 characters")
    @Column(updatable = false, nullable = false)
    private String username;

    @NotNull(message = "Password must not be null")
    @NotBlank(message = "Password must not be empty")
    @Length(min = 8, message = "Password's length must be equal or greater then 8")
    @Column(nullable = false)
    private String password;

    @NotNull(message = "Role must not be null")
    @NotBlank(message = "Role must not be empty")
    @RoleConstraint(message = "Invalid user role")
    @Column(updatable = false, nullable = false)
    private String role;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(
            name = "unit_id", updatable = false, nullable = false,
            foreignKey = @ForeignKey(name = "unit_foreign_key")
    )
    private Unit unit;
}
