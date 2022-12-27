package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.OrderDetailModel;
import com.uet.productionmove.model.OrderModel;
import com.uet.productionmove.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private OrderRepository orderRepository;
    private CustomerRepository customerRepository;
    private OrderDetailRepository orderDetailRepository;
    private ProductLineRepository productLineRepository;
    @Autowired
    private DistributorRepository distributorRepository;

    public Order createOrder(OrderModel orderModel) throws InvalidArgumentException {
        Optional<Customer> customerOptional = customerRepository.findById(orderModel.getCustomerId());
        if (customerOptional.isEmpty()) {
            throw new InvalidArgumentException("Customer with ID not exists.");
        }

        Optional<Distributor> distributorOptional =
                distributorRepository.findById(orderModel.getDistributorId());
        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with ID not exists.");
        }

        Order order = new Order();
        order.setId(null);
        order.setOrderDate(orderModel.getOrderDate());
        order.setCustomer(customerOptional.get());
        order.setDistributor(distributorOptional.get());
        order = orderRepository.save(order);

        List<OrderDetail> orderDetails = new ArrayList<>();
        for (int i = 0; i < orderModel.getOrderDetailList().size(); ++i) {
            OrderDetailModel orderDetailModel = orderModel.getOrderDetailList().get(i);
            Optional<ProductLine> productLineOptional = productLineRepository
                    .findById(orderDetailModel.getProductLineId());
            if (productLineOptional.isEmpty()) {
                throw new InvalidArgumentException("Product line with ID not exists.");
            }

            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setProductLine(productLineOptional.get());
            orderDetail.setQuantity(orderDetailModel.getQuantity());
            orderDetail.setOrder(order);
            orderDetail = orderDetailRepository.save(orderDetail);
            orderDetails.add(orderDetail);
        }
        order.setOrderDetails(orderDetails);
        return order;
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
            orderRepository.deleteById(orderId);
        } else {
            throw new InvalidArgumentException("Order with ID not exists.");
        }
    }

    public void deleteOrderByCustomer(Long customerId) throws InvalidArgumentException {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        if (customerOptional.isEmpty()) {
            throw new InvalidArgumentException("Customer with ID not exists.");
        }
        List<Order> orders = getAllOrderByCustomer(customerId);
        orders.forEach(order -> {
            orderDetailRepository.deleteByOrderId(order.getId());
        });

        orderRepository.deleteByCustomerId(customerId);
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

    public List<Order> getAllOrderByCustomer(Long customerId) {
        return orderRepository.findAllByCustomerId(customerId);
    }

    public List<Order> getAllOrderByDistributorId(Long distributorId) throws InvalidArgumentException {
        Optional<Distributor> distributorOptional = distributorRepository.findById(distributorId);
        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with ID not exists.");
        }
        return orderRepository.findAllByDistributor(distributorOptional.get());
    }

    public OrderDetail createOrderDetail(OrderDetailModel orderDetailModel)
            throws InvalidArgumentException {
        Optional<Order> orderOptional = orderRepository.findById(orderDetailModel.getOrderId());
        Optional<ProductLine> productLineOptional = productLineRepository.findById(orderDetailModel.getProductLineId());
        if (orderOptional.isEmpty()) {
            throw new InvalidArgumentException("Order with ID not exists.");
        }
        if (productLineOptional.isEmpty()) {
            throw new InvalidArgumentException("Product line with ID not exists.");
        }
        if (orderDetailRepository.existsByOrderIdAndProductLineId(
                orderDetailModel.getOrderId(), orderDetailModel.getProductLineId())) {
            throw new InvalidArgumentException("Order detail with Order and Product line exists.");
        }

        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setOrder(orderOptional.get());
        orderDetail.setProductLine(productLineOptional.get());
        orderDetail.setQuantity(orderDetailModel.getQuantity());
        orderDetail.setId(null);
        return orderDetailRepository.save(orderDetail);
    }

    public OrderDetail updateOrderDetail(OrderDetailModel orderDetailModel)
            throws InvalidArgumentException {
        Optional<OrderDetail> orderDetailOptional = orderDetailRepository.findById(orderDetailModel.getId());
        Optional<Order> orderOptional = orderRepository.findById(orderDetailModel.getOrderId());
        Optional<ProductLine> productLineOptional = productLineRepository.findById(orderDetailModel.getProductLineId());
        if (orderDetailOptional.isEmpty()) {
            throw new InvalidArgumentException("Order detail with ID not exists.");
        }
        if (orderOptional.isEmpty()) {
            throw new InvalidArgumentException("Order with ID not exists.");
        }
        if (productLineOptional.isEmpty()) {
            throw new InvalidArgumentException("Product line with ID not exists.");
        }
        Optional<OrderDetail> orderDetailByOrderProductLineOptional = orderDetailRepository
                .getOrderDetailByOrderIdAndProductLineId(
                        orderDetailModel.getOrderId(), orderDetailModel.getProductLineId());

        if (orderDetailByOrderProductLineOptional.isPresent() &&
                orderDetailOptional.get().getId() != orderDetailByOrderProductLineOptional.get().getId()) {
            if (orderDetailRepository.existsByOrderIdAndProductLineId(
                    orderDetailModel.getOrderId(), orderDetailModel.getProductLineId())) {
                throw new InvalidArgumentException("Order detail with Order and Product line exists.");
            }
        }

        OrderDetail orderDetail = orderDetailOptional.get();
        orderDetail.setOrder(orderOptional.get());
        orderDetail.setProductLine(productLineOptional.get());
        orderDetail.setQuantity(orderDetailModel.getQuantity());
        return orderDetailRepository.save(orderDetail);
    }

    public OrderDetail getOrderDetail(Long orderDetailId) throws InvalidArgumentException {
        Optional<OrderDetail> orderDetailOptional = orderDetailRepository.findById(orderDetailId);
        if (orderDetailOptional.isEmpty()) {
            throw new InvalidArgumentException("Order detail with ID not exists.");
        }
        return orderDetailOptional.get();
    }

    public void deleteOrderDetail(Long orderDetailId) throws InvalidArgumentException {
        if (!orderDetailRepository.existsById(orderDetailId)) {
            throw new InvalidArgumentException("Order detail with ID not exists.");
        }
        orderDetailRepository.deleteById(orderDetailId);
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

    @Autowired
    public void setProductLineRepository(ProductLineRepository productLineRepository) {
        this.productLineRepository = productLineRepository;
    }
}
