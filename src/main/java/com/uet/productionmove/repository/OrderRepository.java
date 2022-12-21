package com.uet.productionmove.repository;

import com.uet.productionmove.entity.Customer;
import com.uet.productionmove.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByCustomerId(Long customerId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM orders WHERE customer_id = ?1", nativeQuery = true)
    void deleteByCustomerId(Long customerId);

//    @Transactional
//    @Modifying
////    @Query(value = "DELETE FROM Order WHERE customer =")
//    void deleteAllByCustomer(Customer customer);
}
