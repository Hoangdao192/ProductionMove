package com.uet.productionmove.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.uet.productionmove.entity.UserType;

public class RoleConstraintValidator implements
        ConstraintValidator<RoleConstraint, String> {

    @Override
    public void initialize(RoleConstraint roleConstraint) {

    }

    @Override
    public boolean isValid(String role, ConstraintValidatorContext context) {
        return switch (role) {
            case UserType.WARRANTY_CENTER, UserType.DISTRIBUTOR, UserType.MANUFACTURE, UserType.ADMIN -> true;
            default -> false;
        };
    }

}