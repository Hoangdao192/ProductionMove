package com.uet.productionmove.exception.user;

public class DistributorNotExistsException extends UserException {
    public DistributorNotExistsException() {
        super("Distributor not exists");
    }

    public DistributorNotExistsException(String message) {
        super(message);
    }
}
