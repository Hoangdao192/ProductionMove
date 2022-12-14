package com.uet.productionmove.exception.user;

public class UsernameExistsException extends UserException {
    public UsernameExistsException(String message) {
        super(message);
    }

    public UsernameExistsException() {
        super("Username exists.");
    }
}
