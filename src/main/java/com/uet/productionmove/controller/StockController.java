package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Stock;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/stock")
@CrossOrigin("http://localhost:3000")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping(path = "get", params = "stockId")
    public ResponseEntity<Stock> getStock(@RequestParam Long stockId) throws InvalidArgumentException {
        return ResponseEntity.ok(stockService.getStockById(stockId));
    }

    @GetMapping(path = "get", params = "unitId")
    public ResponseEntity<Stock> getStockByUnitId(@RequestParam Long unitId) throws InvalidArgumentException {
        return ResponseEntity.ok(stockService.getStockByOwnerId(unitId));
    }

}
