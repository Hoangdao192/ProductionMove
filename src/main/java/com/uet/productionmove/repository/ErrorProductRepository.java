package com.uet.productionmove.repository;

import com.uet.productionmove.entity.ErrorProduct;
import com.uet.productionmove.entity.Factory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ErrorProductRepository extends JpaRepository<ErrorProduct, Long> {
    List<ErrorProduct> findAllByFactory(Factory factory);
}
