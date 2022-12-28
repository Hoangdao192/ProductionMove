package com.uet.productionmove.model;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductWarrantyModel {

    @NotNull(message = "customerProductId cannot be null.")
    private Long customerProductId;

    @NotNull(message = "startWarrantyDate cannot be null.")
    private LocalDate startWarrantyDate;

    private LocalDate endWarrantyDate;

    @NotNull(message = "warrantyCenterId cannot be null.")
    private Long warrantyCenterId;

    //  Đại lý gửi yêu cầu bảo hành
    @NotNull(message = "requestWarrantyDistributorId cannot be null.")
    private Long requestWarrantyDistributorId;

    private String description;
    private String status;
}
