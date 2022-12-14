package com.uet.productionmove.service;

import com.uet.productionmove.entity.ProductLine;
import com.uet.productionmove.repository.ProductLineRepository;
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

    public Page<ProductLine> getAllProductLine(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productLineRepository.findAll(pageable);
    }

    public ProductLine insertProductLine(ProductLine productLine) {
        return this.productLineRepository.save(productLine);
    }

    public void deleteProductLine(Long productLineId) {
        this.productLineRepository.deleteById(productLineId);
    }

    public void updateProductLine(ProductLine productLine) {
        if (productLineRepository.existsById(productLine.getId())) {
            this.productLineRepository.save(productLine);
        }
    }
}
