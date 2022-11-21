package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Table(name = "factories")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FactoryEntity {

    @Id
    private UUID id;
    private String address;
    @Column(name = "phone_number")
    private String phoneNumber;
}
