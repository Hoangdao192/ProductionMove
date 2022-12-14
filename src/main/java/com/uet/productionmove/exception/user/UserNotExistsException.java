package com.uet.productionmove.exception.user;

public class UserNotExistsException extends UserException {
    public UserNotExistsException() {
        super("User not exists.");
    }

    public UserNotExistsException(String message) {
        super(message);
    }
}
