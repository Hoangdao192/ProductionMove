package com.uet.productionmove.service;

import com.uet.productionmove.entity.ProductLine;
import com.uet.productionmove.repository.ProductLineRepository;
import com.uet.productionmove.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private ProductRepository productRepository;
    private ProductLineRepository productLineRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, ProductLineRepository productLineRepository) {
        this.productRepository = productRepository;
        this.productLineRepository = productLineRepository;

//        ProductLineEntity productLine = productLineRepository.findByProductLineCode("XPS").get();
//        productRepository.save(new ProductEntity(
//                productLine,
//                "XPS 13 Plus", "12th Generation Intel® Core™ i7-1260P",
//                "Windows 11 Pro, 64-bit", "Intel® Iris Xe Graphics",
//                "13.4\", 3.5K 3456x2160, 60Hz, OLED, Touch, Anti-Reflect, 400 nit, InfinityEdge",
//                "16GB, LPDDR5, 5200 MHz, integrated, dual channel",
//                "512G M.2 PCIe Gen 4 NVMe Solid State Drive",
//                "720p at 30 fps HD RGB camera, 400p at 30 fps IR camera, dual-array microphones",
//                "Studio quality tuning with Waves MaxxAudio®Pro and Waves Nx®3D audio",
//                "Intel® Killer™ Wi-Fi 6 1675 (AX211) 2x2 + Bluetooth 5.2 Wireless Card",
//                "3-cell, 55 Wh \"smart\" lithium-ion, integrated"
//        ));
    }

    public void insertProduct(ProductLine productLine) {
        ProductLine p = productRepository.save(productLine);
        System.out.println(p.getId());
    }
}
