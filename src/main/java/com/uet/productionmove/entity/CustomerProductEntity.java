package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "customer_device")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerProductEntity {
    @Id
    private Long deviceId;
    private LocalDate activationDate;
    private LocalDate warrantyExpiredDate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    private CustomerEntity customer;
}
