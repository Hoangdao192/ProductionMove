package com.uet.productionmove.repository;

import com.uet.productionmove.entity.CustomerProduct;
import com.uet.productionmove.entity.Distributor;
import com.uet.productionmove.entity.WarrantyCenter;
import org.springframework.data.jpa.repository.JpaRepository;

import com.uet.productionmove.entity.ProductWarranty;

import java.util.List;
import java.util.Optional;

public interface ProductWarrantyRepository extends JpaRepository<ProductWarranty, Long> {
    List<ProductWarranty> findAllByWarrantyCenter(WarrantyCenter warrantyCenter);

    Optional<ProductWarranty> findByCustomerProductAndEndWarrantyDateIsNull(CustomerProduct customerProduct);

    List<ProductWarranty> findAllByCustomerProductAndEndWarrantyDateIsNull(CustomerProduct customerProduct);

    List<ProductWarranty> findAllByRequestWarrantyDistributor(Distributor distributor);

    List<ProductWarranty> findAllByRequestWarrantyDistributorAndStatusNotLike(Distributor distributor, String status);
    List<ProductWarranty> findAllByWarrantyCenterAndStatus(WarrantyCenter warrantyCenter, String status);

    List<ProductWarranty> findAllByRequestWarrantyDistributorAndStatus(Distributor distributor, String status);

    Long countAllByWarrantyCenter(WarrantyCenter warrantyCenter);
}
