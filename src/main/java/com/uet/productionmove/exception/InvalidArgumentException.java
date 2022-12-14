package com.uet.productionmove.exception;

public class InvalidArgumentException extends Exception {
    public InvalidArgumentException() {
        super("Invalid argument");
    }

    public InvalidArgumentException(String message) {
        super(message);
    }
}
