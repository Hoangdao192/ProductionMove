package com.uet.productionmove.model;

import com.uet.productionmove.entity.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SoldProductModel {
    private Long id;
    private ProductLine productLine;
    private String status;
    private ProductBatch batch;

    private Order order;
    private CustomerProduct customerProduct;
}
