package com.uet.productionmove.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.uet.productionmove.validator.UniqueUsername;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;

import com.uet.productionmove.validator.RoleConstraint;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.*;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {
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

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference
    @JoinColumn(
            name = "unit_id", updatable = false, nullable = false,
            foreignKey = @ForeignKey(name = "unit_foreign_key")
    )
    private Unit unit;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    public void addRole(Role role) {
        roles.add(role);
        role.getUsers().add(this);
    }

    public void removeRole(Role role) {
        roles.remove(role);
        role.getUsers().remove(this);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
