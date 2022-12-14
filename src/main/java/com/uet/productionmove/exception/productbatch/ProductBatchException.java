package com.uet.productionmove.exception.productbatch;

public abstract class ProductBatchException extends Exception {
    public ProductBatchException(String errorMessage) {
        super(errorMessage);
    }
}
