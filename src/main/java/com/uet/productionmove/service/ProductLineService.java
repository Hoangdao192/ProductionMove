package com.uet.productionmove.service;

import com.uet.productionmove.entity.ProductLine;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.repository.ProductLineRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductLineService {
    private ProductLineRepository productLineRepository;

    @Autowired
    public ProductLineService(ProductLineRepository productLineRepository) {
        this.productLineRepository = productLineRepository;
    }

    public ProductLine getProductLineById(Long productLineId) throws InvalidArgumentException {
        Optional<ProductLine> productLineOptional = productLineRepository.findById(productLineId);
        if (productLineOptional.isEmpty()) {
            throw new InvalidArgumentException("ProductLine with ID not exists.");
        }
        return productLineOptional.get();
    }

    public Page<ProductLine> getAllProductLine(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productLineRepository.findAll(pageable);
    }

    public List<ProductLine> getAllProductLine() {
        return productLineRepository.findAll();
    }

    public ProductLine createProductLine(ProductLine productLine) throws InvalidArgumentException {
        if (productLineRepository.existsByProductName(productLine.getProductName())) {
            throw new InvalidArgumentException("Đã tồn tại dòng sản phẩm cùng tên ở trong hệ thống.");
        }

        productLine.setId(null);
        return productLineRepository.save(productLine);
    }

    public void deleteProductLine(Long productLineId) {
        this.productLineRepository.deleteById(productLineId);
    }

    public ProductLine updateProductLine(ProductLine productLine) throws InvalidArgumentException {
        if (!productLineRepository.existsById(productLine.getId())) {
            throw new InvalidArgumentException("ProductLine with ID not exists.");
        }
        return this.productLineRepository.save(productLine);
    }

    // USE production_move;
    // INSERT INTO product_lines(
    // id, audio_and_speaker, battery, camera, display, hard_drive, memory,
    // operating_system, processor, product_name, video_card, wireless
    // )
    // VALUES(
    // 1, "Dual stereo speakers (tweeter + woofer), Realtek ALC1319D, 2 W x 2 = 4 W
    // total",
    // "3-Cell Battery, 51 Whr (Integrated)",
    // "720p at 30 fps HD RGB camera, 400p at 30 fps IR camera, dual-array
    // microphones",
    // "13.4 FHD+ (1920 x 1200) InfinityEdge Touch Anti-Reflective 500-Nit Display",
    // "256GB PCIe NVMe x2 Solid State Drive Onboard, 512GB PCIe NVMe x2 Solid State
    // Drive Onboard",
    // "8GB, LPDDR5, 5200 MHz, integrated, dual channel; 16 GB, LPDDR5, 5200 MHz,
    // integrated, dual-channel",
    // "Windows 11 Pro, 64-bit; Windows 11 Home, 64-bit",
    // "12th Generation Intel® Core™ i5-1230U (12MB Cache, up to 4.4 GHz, 10 cores);
    // 12th Generation Intel® Core™ i7-1250U (12MB Cache, up to 4.7 GHz, 10 cores)",
    // "XPS 13",
    // "Intel® Iris Xe Graphics",
    // "Intel® Killer™ Wi-Fi 6 1675 (AX211) 2x2 + Bluetooth 5.2 Wireless Card"
    // );
    // SELECT * FROM production_move.product_lines;
}
