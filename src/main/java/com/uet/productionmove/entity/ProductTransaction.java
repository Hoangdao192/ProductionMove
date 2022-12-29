package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name = "product_transaction")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "export_stock_id")
    private Stock exportStock;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "import_stock_id")
    private Stock importStock;

    @Column(nullable = false)
    private String transactionStatus;

    @OneToMany(mappedBy = "productTransaction", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ProductTransactionDetail> productTransactionDetails = new ArrayList<>();
}
