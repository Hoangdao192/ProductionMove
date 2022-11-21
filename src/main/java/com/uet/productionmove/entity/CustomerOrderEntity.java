package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Table(name = "customer_orders")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerOrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @org.hibernate.annotations.Type(type="uuid-char")
    @Column(name = "order_id")
    private UUID orderId;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "customer_id")
    private UUID customerId;

    @Column(name = "customer_device_id")
    private UUID customerDeviceId;
}
