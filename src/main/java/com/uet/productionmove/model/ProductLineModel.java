package com.uet.productionmove.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductLineModel {
    private String productName;
    private String processor;
    private String operatingSystem;
    private String videoCard;
    private String display;
    private String memory;
    private String hardDrive;
    private String camera;
    private String audioAndSpeaker;
    private String wireless;
    private String battery;
}
