package com.uet.productionmove.service;

import com.uet.productionmove.entity.BatchEntity;
import com.uet.productionmove.entity.FactoryEntity;
import com.uet.productionmove.entity.ProductLineEntity;
import com.uet.productionmove.model.ProductBatchModel;
import com.uet.productionmove.repository.BatchRepository;
import com.uet.productionmove.repository.FactoryRepository;
import com.uet.productionmove.repository.ProductLineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductBatchService {

    @Autowired
    private BatchRepository batchRepository;
    @Autowired
    private FactoryRepository factoryRepository;
    @Autowired
    private ProductLineRepository productLineRepository;

    public void insertProductBatch(ProductBatchModel productBatchModel) {
        Optional<FactoryEntity> factoryEntity =  factoryRepository.findByUserId(productBatchModel.getUserId());
        Optional<ProductLineEntity> productLine = productLineRepository.findById(productBatchModel.getProductLineId());
        if (factoryEntity.isPresent() && productLine.isPresent()) {
            BatchEntity batch = new BatchEntity(
                    null, productBatchModel.getManufacturingDate(),
                    factoryEntity.get(), productLine.get()
            );
            batchRepository.save(batch);
        }
    }

    public void deleteProductBatch(Long productBatchId) {
        batchRepository.deleteById(productBatchId);
    }

}
