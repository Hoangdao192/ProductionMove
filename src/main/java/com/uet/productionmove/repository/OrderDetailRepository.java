package com.uet.productionmove.repository;

import com.uet.productionmove.entity.Order;
import com.uet.productionmove.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM order_details WHERE order_id = ?1", nativeQuery = true)
    void deleteByOrderId(Long orderId);

//    @Transactional
//    void deleteAllByOrder(Order order);

//    void deleteByOrder(Order order);

    boolean existsByOrderIdAndProductLineId(Long orderId, Long productLineId);

    Optional<OrderDetail> getOrderDetailByOrderIdAndProductLineId(Long orderId, Long productLineId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM order_details WHERE id = ?1", nativeQuery = true)
    void deleteById(Long orderDetailId);
}
