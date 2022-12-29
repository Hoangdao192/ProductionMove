package com.uet.productionmove.entity;

import javax.persistence.*;

@Table(name = "product_transaction")
public class ProductTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "export_stock_id")
    private Stock exportStock;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "import_stock_id")
    private Stock importStock;

    @Column(nullable = false)
    private String transactionStatus;
}
