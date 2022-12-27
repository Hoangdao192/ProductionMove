package com.uet.productionmove.controller;

import com.uet.productionmove.entity.Order;
import com.uet.productionmove.entity.OrderDetail;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.OrderDetailModel;
import com.uet.productionmove.model.OrderModel;
import com.uet.productionmove.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(path = "api/order")
@PreAuthorize("hasAnyAuthority('Admin', 'Distributor') and isAuthenticated()")
public class OrderController {

    private OrderService orderService;

    @PostMapping(path = "create")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody @Valid OrderModel orderModel)
            throws InvalidArgumentException {
        Order order = orderService.createOrder(orderModel);
        return ResponseEntity.ok(
                Map.of("message", "Create order successful",
                        "content", Map.of("order", order)));
    }

    @PostMapping(path = "update")
    public ResponseEntity<Map<String, Object>> updateOrder(@RequestBody @Valid OrderModel orderModel)
            throws InvalidArgumentException {
        Order order = orderService.updateOrder(orderModel);
        return ResponseEntity.ok(
                Map.of("message", "Update order successful",
                        "content", Map.of("order", order)));
    }

    @DeleteMapping(path = "delete/{orderId}")
    public ResponseEntity<Map<String, Object>> deleteOrder(@PathVariable @Valid @NotNull Long orderId)
            throws InvalidArgumentException {
        orderService.deleteOrder(orderId);
        return ResponseEntity.ok(
                Map.of("message", "Delete order successful",
                        "content", Map.of("id", orderId)));
    }

    @GetMapping(path = "get")
    public ResponseEntity<Order> getOrder(@RequestParam @Valid @NotNull Long orderId)
            throws InvalidArgumentException {
        Order order = orderService.getOrder(orderId);
        return ResponseEntity.ok(order);
    }

    @GetMapping(path = "list")
    public ResponseEntity<List<Order>> getOrder() {
        List<Order> orders = orderService.getAllOrder();
        return ResponseEntity.ok(orders);
    }

    @GetMapping(path = "/list", params = "distributorId")
    public ResponseEntity<List<Order>> getAllOrderByDistributorId(@RequestParam Long distributorId)
            throws InvalidArgumentException {
        return ResponseEntity.ok(orderService.getAllOrderByDistributorId(distributorId));
    }


    @PostMapping(path = "/detail/create")
    public ResponseEntity<Map<String, Object>> createOrderDetail(
            @RequestBody @Valid OrderDetailModel orderDetailModel) throws InvalidArgumentException {
        OrderDetail orderDetail = orderService.createOrderDetail(orderDetailModel);
        return ResponseEntity.ok(Map.of(
                "message", "Create order detail successful",
                "content", Map.of("orderDetail", orderDetail)));
    }

    @PostMapping(path = "/detail/update")
    public ResponseEntity<Map<String, Object>> updateOrderDetail(
            @RequestBody @Valid OrderDetailModel orderDetailModel) throws InvalidArgumentException {
        OrderDetail orderDetail = orderService.updateOrderDetail(orderDetailModel);
        return ResponseEntity.ok(Map.of(
                "message", "Update order detail successful",
                "content", Map.of("orderDetail", orderDetail)));
    }

    @GetMapping(path = "/detail/get")
    public ResponseEntity<OrderDetail> getOrderDetail(@RequestParam Long orderDetailId)
            throws InvalidArgumentException {
        OrderDetail orderDetail = orderService.getOrderDetail(orderDetailId);
        return ResponseEntity.ok(orderDetail);
    }

    @DeleteMapping(path = "/detail/delete/{orderDetailId}")
    public ResponseEntity<Map<String, Object>> deleteOrderDetailById(@PathVariable Long orderDetailId)
            throws InvalidArgumentException {
        orderService.deleteOrderDetail(orderDetailId);
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Delete order detail successful",
                "content", Map.of("id", orderDetailId)));
    }

    @Autowired
    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }
}
