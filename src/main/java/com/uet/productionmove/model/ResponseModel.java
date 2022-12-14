package com.uet.productionmove.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseModel {
    public static final String STATUS_SUCCESS = "success";
    public static final String STATUS_FAIL = "failed";

    private String status;
    private String message;
    private String statusCode;
    private Map<String, Object> content;

    public ResponseModel(String status, String message) {
        this.status = status;
        this.message = message;
        this.content = new HashMap<>();
    }

    public ResponseModel(String status, String message, String statusCode) {
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
    }

    public ResponseModel(String status, String message, Map<String, Object> content) {
        this.status = status;
        this.message = message;
        this.content = content;
    }
}
