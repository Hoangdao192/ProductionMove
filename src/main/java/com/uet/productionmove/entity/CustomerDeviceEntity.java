package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Table(name = "customer_devices")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDeviceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    @org.hibernate.annotations.Type(type="uuid-char")
    private UUID id;

    @Column(name = "customer_id")
    private UUID customerId;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "device_code", unique = true)
    private String deviceCode;

    @Column(name = "product_code")
    private String productCode;
}
