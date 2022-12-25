package com.uet.productionmove.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = NotEmptyListValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface NotEmptyList {

    String message() default "List must not be empty.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
