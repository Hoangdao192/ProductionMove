package com.uet.productionmove.exception.user;

public abstract class UserException extends Exception {
    public UserException() {}

    public UserException(String message) {
        super(message);
    }
}
