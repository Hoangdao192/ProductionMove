package com.uet.productionmove.exception.order;

public abstract class OrderException extends Exception {
    public OrderException(String errorMessage) {
        super(errorMessage);
    }
}
