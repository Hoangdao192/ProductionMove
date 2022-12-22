package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import java.io.Serializable;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UnitAccountId implements Serializable {

    @Type(type = "uuid-char")
    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "unit_id")
    private Long unitId;
}
