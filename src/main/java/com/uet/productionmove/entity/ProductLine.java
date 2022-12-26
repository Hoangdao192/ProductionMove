package com.uet.productionmove.entity;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Table(name = "product_lines")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductLine {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull(message = "productName cannot be null.")
    @NotEmpty(message = "productName cannot be empty.")
    @Column(nullable = false, unique = true)
    private String productName;

    @NotNull(message = "processor cannot be null.")
    @NotEmpty(message = "processor cannot be empty.")
    @Column(nullable = false)
    private String processor;

    @NotNull(message = "operatingSystem cannot be null.")
    @NotEmpty(message = "operatingSystem cannot be empty.")
    @Column(nullable = false)
    private String operatingSystem;

    @NotNull(message = "videoCard cannot be null.")
    @NotEmpty(message = "videoCard cannot be empty.")
    @Column(nullable = false)
    private String videoCard;

    @NotNull(message = "display cannot be null.")
    @NotEmpty(message = "display cannot be empty.")
    @Column(nullable = false)
    private String display;

    @NotNull(message = "memory cannot be null.")
    @NotEmpty(message = "memory cannot be empty.")
    @Column(nullable = false)
    private String memory;

    @NotNull(message = "hardDrive cannot be null.")
    @NotEmpty(message = "hardDrive cannot be empty.")
    @Column(nullable = false)
    private String hardDrive;

    @NotNull(message = "camera cannot be null.")
    @NotEmpty(message = "camera cannot be empty.")
    @Column(nullable = false)
    private String camera;

    @NotNull(message = "audioAndSpeaker cannot be null.")
    @NotEmpty(message = "audioAndSpeaker cannot be empty.")
    @Column(nullable = false)
    private String audioAndSpeaker;

    @NotNull(message = "wireless cannot be null.")
    @NotEmpty(message = "wireless cannot be empty.")
    @Column(nullable = false)
    private String wireless;

    @NotNull(message = "battery cannot be null.")
    @NotEmpty(message = "battery cannot be empty.")
    @Column(nullable = false)
    private String battery;

    @OneToMany(mappedBy = "productLine", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ProductBatch> productBatchs = new ArrayList<>();

    public ProductLine(
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
