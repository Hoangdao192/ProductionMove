package com.uet.productionmove.service;

import com.uet.productionmove.entity.Customer;
import com.uet.productionmove.entity.Order;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.OrderModel;
import com.uet.productionmove.repository.CustomerRepository;
import com.uet.productionmove.repository.OrderDetailRepository;
import com.uet.productionmove.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private OrderRepository orderRepository;
    private CustomerRepository customerRepository;
    private OrderDetailRepository orderDetailRepository;

    public Order createOrder(OrderModel orderModel) throws InvalidArgumentException {
        Optional<Customer> customerOptional = customerRepository.findById(orderModel.getCustomerId());
        if (customerOptional.isEmpty()) {
            throw new InvalidArgumentException("Customer with ID not exists.");
        }

        Order order = new Order();
        order.setId(null);
        order.setOrderDate(orderModel.getOrderDate());
        order.setCustomer(customerOptional.get());
        return orderRepository.save(order);
    }

    public Order updateOrder(OrderModel orderModel) throws InvalidArgumentException {
        if (orderModel.getId() == null) {
            throw new InvalidArgumentException("Order ID is null.");
        }

        Optional<Customer> customerOptional = customerRepository.findById(orderModel.getCustomerId());
        Optional<Order> orderOptional = orderRepository.findById(orderModel.getId());

        if (customerOptional.isEmpty()) {
            throw new InvalidArgumentException("Customer with ID not exists");
        }
        if (orderOptional.isEmpty()) {
            throw new InvalidArgumentException("Order with ID not exists.");
        }
        Order order = orderOptional.get();
        order.setOrderDate(orderModel.getOrderDate());
        order.setCustomer(customerOptional.get());
        return orderRepository.save(order);
    }

    public void deleteOrder(Long orderId) throws InvalidArgumentException {
        if (orderRepository.existsById(orderId)) {
            orderDetailRepository.deleteByOrderId(orderId);
            orderRepository.deleteById(orderId);
        } else {
            throw new InvalidArgumentException("Order with ID not exists.");
        }
    }

    public Order getOrder(Long orderId) throws InvalidArgumentException {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isEmpty()) {
            throw new InvalidArgumentException("Order with ID not exists.");
        }
        return orderOptional.get();
    }

    public List<Order> getAllOrder() {
        return orderRepository.findAll();
    }

    @Autowired
    public void setOrderRepository(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Autowired
    public void setCustomerRepository(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Autowired
    public void setOrderDetailRepository(OrderDetailRepository orderDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
    }
}
