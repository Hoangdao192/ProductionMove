package com.uet.productionmove.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return new ResponseEntity<>(
                Map.of("errors", errors), HttpStatus.BAD_REQUEST
        );
    }

//    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({InvalidArgumentException.class})
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(
            InvalidArgumentException ex) {
//        ex.printStackTrace();
        return new ResponseEntity<>(
                Map.of("error", ex.getMessage()), HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<Map<String, Object>> handleSystemException(Exception e) {
        //  Logging
        e.printStackTrace();
        if (e instanceof AccessDeniedException) {
            return new ResponseEntity<>(
                    Map.of("error", "Access is denied"), HttpStatus.UNAUTHORIZED
            );
        }
        return new ResponseEntity<>(
                Map.of("error", "Invalid request."), HttpStatus.BAD_REQUEST
        );
    }

}
