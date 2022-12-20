package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Order;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.OrderModel;
import com.uet.productionmove.service.OrderService;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/order")
public class OrderController {

    private OrderService orderService;

    @PostMapping(path = "create")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody @Valid OrderModel orderModel)
            throws InvalidArgumentException {
        Order order = orderService.createOrder(orderModel);
        return ResponseEntity.ok(
                Map.of("message", "Create order successful",
                "content", Map.of("order", order))
        );
    }

    @PostMapping(path = "update")
    public ResponseEntity<Map<String, Object>> updateOrder(@RequestBody @Valid OrderModel orderModel)
            throws InvalidArgumentException {
        Order order = orderService.updateOrder(orderModel);
        return ResponseEntity.ok(
                Map.of("message", "Update order successful",
                        "content", Map.of("order", order))
        );
    }

    @DeleteMapping(path = "delete/{orderId}")
    public ResponseEntity<Map<String, Object>> deleteOrder(@PathVariable @Valid @NotNull Long orderId)
            throws InvalidArgumentException {
        orderService.deleteOrder(orderId);
        return ResponseEntity.ok(
                Map.of("message", "Delete order successful",
                        "content", Map.of("id", orderId))
        );
    }

    @GetMapping(path = "get")
    public ResponseEntity<Map<String, Object>> getOrder(@RequestParam @Valid @NotNull Long orderId)
            throws InvalidArgumentException {
        Order order = orderService.getOrder(orderId);
        return ResponseEntity.ok(
                Map.of("message", "Get order successful",
                        "content", Map.of("order", order))
        );
    }

    @GetMapping(path = "list")
    public ResponseEntity<Map<String, Object>> getOrder()
            throws InvalidArgumentException {
        List<Order> orders = orderService.getAllOrder();
        return ResponseEntity.ok(
                Map.of("message", "List order successful",
                        "content", Map.of("orders", orders))
        );
    }

    @Autowired
    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }
}
