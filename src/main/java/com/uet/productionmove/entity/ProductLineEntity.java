package com.uet.productionmove.entity;

import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Table(name = "products")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
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

    @ManyToOne
    @JoinColumn(name = "product_line_id")
    private ProductLineEntity productLine;

    public ProductEntity(
            ProductLineEntity productLine,
            String productName, String processor, String operatingSystem,
            String videoCard, String display, String memory,
            String hardDrive, String camera, String audioAndSpeaker,
            String wireless, String battery) {
        this.productName = productName;
        this.processor = processor;
        this.operatingSystem = operatingSystem;
        this.videoCard = videoCard;
        this.display = display;
        this.memory = memory;
        this.hardDrive = hardDrive;
        this.camera = camera;
        this.audioAndSpeaker = audioAndSpeaker;
        this.wireless = wireless;
        this.battery = battery;
        this.productLine = productLine;
    }

    public ProductEntity(
            String productName, String processor, String operatingSystem,
            String videoCard, String display, String memory, String hardDrive,
            String camera, String audioAndSpeaker, String wireless, String battery) {
        this.productName = productName;
        this.processor = processor;
        this.operatingSystem = operatingSystem;
        this.videoCard = videoCard;
        this.display = display;
        this.memory = memory;
        this.hardDrive = hardDrive;
        this.camera = camera;
        this.audioAndSpeaker = audioAndSpeaker;
        this.wireless = wireless;
        this.battery = battery;
    }
}
