package com.uet.productionmove.entity;

import lombok.*;

import javax.persistence.*;

@Table(name = "product_lines")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductLineEntity {
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

    public ProductLineEntity(
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
