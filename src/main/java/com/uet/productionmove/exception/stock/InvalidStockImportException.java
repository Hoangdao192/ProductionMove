package com.uet.productionmove.exception.stock;

public class InvalidStockImportException extends StockException {
    public InvalidStockImportException(String errorMessage) {
        super(errorMessage);
    }
}
