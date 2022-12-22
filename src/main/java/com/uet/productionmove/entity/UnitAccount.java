package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "unit_accounts")
@Entity
@IdClass(UnitAccountId.class)
public class UnitAccount {
    @Id
    @Column(name = "unit_id")
    private Long unitId;

    @Id
    @Column(name = "user_id")
    @Type(type = "uuid-char")
    private UUID userId;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(
            name = "unit_id",
            foreignKey = @ForeignKey(name = "unit_foreign_key")
    )
    private Unit unit;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(
            name = "user_id",
            foreignKey = @ForeignKey(name = "user_foreign_key")
    )
    private User user;
}
