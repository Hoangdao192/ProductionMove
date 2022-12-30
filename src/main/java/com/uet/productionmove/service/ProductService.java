package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {
    private ProductRepository productRepository;
    private ProductLineRepository productLineRepository;
    @Autowired
    private FactoryRepository factoryRepository;
    private StockService stockService;
    private FactoryService factoryService;
    @Autowired
    private BatchRepository batchRepository;
    private WarrantyCenterService warrantyCenterService;
    @Autowired
    private WarrantyCenterRepository warrantyCenterRepository;
    @Autowired
    private ProductWarrantyRepository productWarrantyRepository;
    @Autowired
    private DistributorRepository distributorRepository;

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

    public Product getProductById(Long productId) throws InvalidArgumentException {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isEmpty()) {
            throw new InvalidArgumentException("Product with ID not exists.");
        }
        return productOptional.get();
    }

    public Product updateProduct(Product product) throws InvalidArgumentException {
        Product dbProduct = getProductById(product.getId());
        dbProduct.setStock(product.getStock());
        dbProduct.setStatus(product.getStatus());
        return productRepository.save(dbProduct);
    }

    public List<Product> getAllProduct(String status, Long stockId) throws InvalidArgumentException {
        Stock stock = stockService.getStockById(stockId);
        return productRepository.findAllByStockAndStatus(stock, status);
    }

    @Autowired
    public void setStockService(StockService stockService) {
        this.stockService = stockService;
    }

    public Map<String, Long> getProductStatusStatistic() {
        Map<String, Long> statistic = new HashMap<>();
        statistic.put(ProductStatus.AGENCY, productRepository.countAllByStatus(ProductStatus.AGENCY));
        statistic.put(ProductStatus.DONE_WARRANTY, productRepository.countAllByStatus(ProductStatus.DONE_WARRANTY));
        statistic.put(ProductStatus.ERROR_FACTORY, productRepository.countAllByStatus(ProductStatus.ERROR_FACTORY));
        statistic.put(ProductStatus.ERROR_SUMMON, productRepository.countAllByStatus(ProductStatus.ERROR_SUMMON));
        statistic.put(ProductStatus.ERROR_WARRANTY, productRepository.countAllByStatus(ProductStatus.ERROR_WARRANTY));
        statistic.put(ProductStatus.ERROR_RETURNED_FACTORY, productRepository.countAllByStatus(ProductStatus.ERROR_RETURNED_FACTORY));
        statistic.put(ProductStatus.NEWLY_PRODUCED, productRepository.countAllByStatus(ProductStatus.NEWLY_PRODUCED));
        statistic.put(ProductStatus.SOLD, productRepository.countAllByStatus(ProductStatus.SOLD));
        statistic.put(ProductStatus.UNDER_WARRANTY, productRepository.countAllByStatus(ProductStatus.UNDER_WARRANTY));
        statistic.put(ProductStatus.RETURNED_FACTORY, productRepository.countAllByStatus(ProductStatus.RETURNED_FACTORY));
        statistic.put(ProductStatus.RETURNED_WARRANTY, productRepository.countAllByStatus(ProductStatus.RETURNED_WARRANTY));
        statistic.put(ProductStatus.WARRANTY_EXPIRED, productRepository.countAllByStatus(ProductStatus.WARRANTY_EXPIRED));
        statistic.put(ProductStatus.CANNOT_SALE, productRepository.countAllByStatus(ProductStatus.CANNOT_SALE));
        return statistic;
    }

    public Map<String, Long> getProductPerFactoryStatistic() {
        Map<String, Long> data = new HashMap<>();
        List<Factory> factories = factoryRepository.findAll();
        for (int i = 0; i < factories.size(); ++i) {
            Factory factory = factories.get(i);
            List<ProductBatch> productBatches = batchRepository.findAllByFactoryId(factory.getId());
            long totalProduct = 0L;
            for (int j = 0; j < productBatches.size(); ++j) {
                totalProduct += productRepository.countAllByBatch(productBatches.get(j));
            }
            data.put(factory.getName(), totalProduct);
        }
        return data;
    }

    public Map<String, Long> getProductPerWarrantyCenterStatistic() {
        Map<String, Long> data = new HashMap<>();
        List<WarrantyCenter> warrantyCenters = warrantyCenterRepository.findAll();
        for (int i = 0; i < warrantyCenters.size(); ++i) {
            WarrantyCenter warrantyCenter = warrantyCenters.get(i);
            data.put(warrantyCenter.getName(),
                    productWarrantyRepository.countAllByWarrantyCenter(warrantyCenter));
        }
        return data;
    }

    public Map<String, Long> getProductPerDistributorStatistic() {
        List<Distributor> distributors = distributorRepository.findAll();
        Map<String, Long> data =  new HashMap<>();
        for (int i = 0; i < distributors.size(); ++i) {
            Distributor distributor = distributors.get(i);
            Stock stock = null;
            try {
                stock = stockService.getStockByStockOwner(distributor.getUnit());
            } catch (Exception e) {}
            data.put(distributor.getName(), productRepository.countAllByStock(stock));
        }
        return data;
    }

    @Autowired
    public void setFactoryService(FactoryService factoryService) {
        this.factoryService = factoryService;
    }
}
