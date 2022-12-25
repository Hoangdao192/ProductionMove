package com.uet.productionmove.model;

import com.uet.productionmove.validator.NotEmptyList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderModel {
    private Long id;

    @NotNull(message = "orderDate cannot be null")
    private LocalDate orderDate;

    @NotNull(message = "customerId cannot be null")
    private Long customerId;

    @NotNull(message = "order details cannot be null.")
    @Valid
    @NotEmptyList
    private List<OrderDetailModel> orderDetailList;
}
