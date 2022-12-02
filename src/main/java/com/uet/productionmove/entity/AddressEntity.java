package com.uet.productionmove.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "address")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String province;
    private String district;
    private String ward;
    private String detailAddress;

    public AddressEntity(String province, String district, String ward, String detailAddress) {
        this.province = province;
        this.district = district;
        this.ward = ward;
        this.detailAddress = detailAddress;
    }

    @Override
    public String toString() {
        return detailAddress + ", " + ward + ", " + district + ", " + province;
    }
}
