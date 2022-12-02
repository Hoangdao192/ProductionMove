package com.uet.productionmove.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseModel {
    private String status;
    private String message;
    private Map<String, Object> content;
}
