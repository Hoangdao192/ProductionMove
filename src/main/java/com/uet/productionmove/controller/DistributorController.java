package com.uet.productionmove.controller;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.*;
import com.uet.productionmove.service.DistributorService;
import com.uet.productionmove.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/distributor")
@PreAuthorize("hasAnyAuthority('Admin', 'Distributor', 'Manufacture') and isAuthenticated()")
public class DistributorController {

    private DistributorService distributorService;
    @Autowired
    private ProductService productService;

    @PostMapping(path = "/create")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<Map<String, Object>> createDistributor(
            @Valid @RequestBody DistributorModel distributorModel) throws InvalidArgumentException {

        Distributor distributor = distributorService.createDistributor(distributorModel);
        return ResponseEntity.ok(Map.of("message", "Create distributor successful",
                "distributor", distributor));
    }

    @PostMapping(path = "/update")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<Map<String, Object>> updateDistributor(
            @Valid @RequestBody DistributorModel distributorModel) throws InvalidArgumentException {

        Distributor distributor = distributorService.updateDistributor(distributorModel);
        return ResponseEntity.ok().body(Map.of(
                "message", "Update distributor successful",
                "distributor", distributor));
    }

    @GetMapping(path = "/get", params = "unitId")
    public ResponseEntity<Distributor> getDistributorByUnitId(@RequestParam Long unitId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(distributorService.getDistributorByUnitId(unitId));
    }

    @GetMapping(path = "/list")
    @PreAuthorize("hasAnyAuthority('Admin', 'Manufacture') and isAuthenticated()")
    public ResponseEntity<List<DistributorModel>> getAllDistributor() {
        return ResponseEntity.ok(distributorService.getAllDistributor());
    }

    @GetMapping(path = "/stock/list")
    @PreAuthorize("hasAnyAuthority('Admin', 'Distributor') and isAuthenticated()")
    public ResponseEntity<List<ProductBatch>> getAllProductBatchInStock(@RequestParam Long distributorId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(distributorService.getAllProductBatchInStock(distributorId));
    }

    @GetMapping(path = "stock/product/list")
    @PreAuthorize("hasAnyAuthority('Admin', 'Distributor') and isAuthenticated()")
    public ResponseEntity<List<Product>> getAllProductInStock(@RequestParam Long distributorId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(distributorService.getAllProductInStock(distributorId));
    }

    @GetMapping(path = "stock/product/list/saleable")
    @PreAuthorize("hasAnyAuthority('Admin', 'Distributor') and isAuthenticated()")
    public ResponseEntity<List<Product>> getAllProductSaleableInStock(@RequestParam Long distributorId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(distributorService.getAllSellableProductInStock(distributorId));
    }

    @GetMapping(path = "sold/list")
    @PreAuthorize("hasAnyAuthority('Admin', 'Distributor') and isAuthenticated()")
    public ResponseEntity<List<SoldProductModel>> getAllSoldProduct(@RequestParam Long distributorId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(distributorService.getAllSoldProduct(distributorId));
    }

    //  Lấy tất cả sản phẩm lỗi không thể sửa chữa
    @GetMapping(path = "stock/product/error")
    public ResponseEntity<List<Product>> getAllProductCannotFix(@RequestParam Long distributorId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(distributorService.getAllErrorProductCannotFixInStock(distributorId));
    }

    @GetMapping(path = "productRecall")
    public ResponseEntity<List<CustomerProduct>> getAllRecallProduct(
            @RequestParam Long distributorId, @RequestParam Long productLineId
    ) throws InvalidArgumentException {
        return ResponseEntity.ok(distributorService.getAllRecallCustomerProduct(distributorId, productLineId));
    }

    @PostMapping(path = "productRecall")
    public ResponseEntity<String> recallProduct(
            @RequestParam Long distributorId, @RequestParam Long productLineId, @RequestParam Long warrantyCenterId
    ) throws InvalidArgumentException {
        distributorService.recallProduct(distributorId, productLineId, warrantyCenterId);
        return ResponseEntity.ok("Success");
    }

    @PostMapping(path = "warranty/request")
    @PreAuthorize("hasAnyAuthority('Admin', 'Distributor') and isAuthenticated()")
    public ResponseEntity<ProductWarranty> requestProductWarranty(
            @RequestBody @Valid ProductWarrantyModel productWarrantyModel) throws InvalidArgumentException {
        return ResponseEntity.ok(distributorService.requestProductWarranty(productWarrantyModel));
    }

    @GetMapping(path = "warranty/list")
    @PreAuthorize("hasAnyAuthority('Admin', 'Distributor') and isAuthenticated()")
    public ResponseEntity<List<ProductWarranty>> getAllRequestProductWarranty(
            @RequestParam Long distributorId) throws InvalidArgumentException {
        return ResponseEntity.ok(
                distributorService.getAllRequestWarranty(distributorId)
        );
    }

    @GetMapping(path = "/productTransaction/incoming")
    public ResponseEntity<List<FactoryProductTransactionModel>> getAllInComingProductTransaction(
            @RequestParam Long distributorId
    ) throws InvalidArgumentException {
        return ResponseEntity.ok(
            distributorService.getAllInComingProductTransaction(distributorId)
        );
    }

    @PostMapping(path = "/productTransaction/import")
    public ResponseEntity<String> importProductTransaction(@RequestParam Long productTransactionId)
            throws InvalidArgumentException{
        distributorService.importProductTransaction(productTransactionId);
        return ResponseEntity.ok("Success");
    }

    @PostMapping(path = "/stock/export")
    public ResponseEntity<String> exportProductToFactory(@RequestBody @Valid DistributorExportModel distributorExportModel)
            throws InvalidArgumentException{
        distributorService.exportProductToFactory(distributorExportModel);
        return ResponseEntity.ok("Success");
    }

    @GetMapping(path = "warranty/finish")
    public ResponseEntity<List<ProductWarranty>> getAllFinishedProductWarranty(
            @RequestParam Long distributorId) throws InvalidArgumentException {
        return ResponseEntity.ok(
                distributorService.getAllFinishedWarranty(distributorId)
        );
    }

    @PostMapping(path = "warranty/return")
    public ResponseEntity<String> returnProductToCustomer(
            @RequestParam Long productWarrantyId
    ) throws InvalidArgumentException {
        distributorService.returnWarrantyProductToCustomer(productWarrantyId);
        return ResponseEntity.ok("Success");
    }

    @DeleteMapping(path = "delete")
    @PreAuthorize("hasAnyAuthority('Admin') and isAuthenticated()")
    public ResponseEntity<Map<String, Object>> deleteDistributor(@RequestParam Long distributorId)
            throws InvalidArgumentException {
        distributorService.deleteDistributor(distributorId);
        return ResponseEntity.ok(Map.of(
                "message", "Delete warranty center successful.",
                "content", Map.of("id", distributorId)));
    }

    @GetMapping(path = "productStatistic")
    public ResponseEntity<Map<String, Long>> getProductStatistic() {
        return ResponseEntity.ok(productService.getProductPerDistributorStatistic());
    }

    @GetMapping(path = "productStatistic/status")
    public ResponseEntity<Map<String, Long>> getProductStatusStatistic(@RequestParam Long distributorId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(distributorService.getProductStatusStatistic(distributorId));
    }

    @GetMapping(path = "saleStatistic/perMonth")
    public ResponseEntity<Map<String, Long>> getProductSoldStatisticPerMonth(
            @RequestParam Long distributorId, int year)
            throws InvalidArgumentException {
        return ResponseEntity.ok(distributorService.getSoldProductStatisticPerMonth(distributorId, year));
    }

    @GetMapping(path = "saleStatistic/perYear")
    public ResponseEntity<Map<String, Long>> getProductSoldStatisticPerMonth(
            @RequestParam Long distributorId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(distributorService.getSoldProductStatisticPerYear(distributorId));
    }

    @Autowired
    public void setDistributorService(DistributorService distributorService) {
        this.distributorService = distributorService;
    }
}
