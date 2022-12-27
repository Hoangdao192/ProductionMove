package com.uet.productionmove.service;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.exception.InvalidArgumentException;
import com.uet.productionmove.model.DistributorModel;
import com.uet.productionmove.repository.BatchRepository;
import com.uet.productionmove.repository.DistributorRepository;
import com.uet.productionmove.repository.StockRepository;
import com.uet.productionmove.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.StackWalker.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DistributorService {

    private DistributorRepository distributorRepository;
    @Autowired
    private UnitRepository unitRepository;
    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private BatchRepository batchRepository;

    public Distributor createDistributor(DistributorModel distributorModel)
            throws InvalidArgumentException {

        Unit unit = new Unit();
        unit.setType(UserType.DISTRIBUTOR);
        unit = unitRepository.save(unit);

        Distributor distributor = new Distributor(
                unit,
                distributorModel.getName(),
                distributorModel.getAddress(),
                distributorModel.getPhoneNumber());

        distributor = distributorRepository.save(distributor);
        createDistributorStock(distributor);
        return distributor;
    }

    private Stock createDistributorStock(Distributor distributor) {
        Stock stock = new Stock();
        stock.setStockOwner(distributor.getUnit());
        stock.setName(distributor.getName());
        stock.setAddress(distributor.getAddress());
        stock = stockRepository.save(stock);
        return stock;
    }

    public Distributor updateDistributor(DistributorModel distributorModel)
            throws InvalidArgumentException {
        Optional<Distributor> distributorOptional = distributorRepository.findById(distributorModel.getId());

        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with ID not exists");
        }

        Distributor distributor = distributorOptional.get();
        distributor.setName(distributorModel.getName());
        distributor.setAddress(distributorModel.getAddress());
        distributor.setPhoneNumber(distributorModel.getPhoneNumber());
        return distributorRepository.save(distributor);
    }

    public Distributor getDistributorByUnitId(Long unitId) throws InvalidArgumentException {
        Optional<Distributor> distributorOptional = distributorRepository.findByUnitId(unitId);
        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with Unit ID not exists.");
        }
        return distributorOptional.get();
    }

    public List<DistributorModel> getAllDistributor() {
        List<Distributor> distributors = distributorRepository.findAll();
        List<DistributorModel> distributorModels = new ArrayList<>();
        distributors.forEach(distributor -> {
            DistributorModel distributorModel = new DistributorModel();
            distributorModel.setId(distributor.getId());
            distributorModel.setUnitId(distributor.getUnit().getId());
            distributorModel.setName(distributor.getName());
            distributorModel.setAddress(distributor.getAddress());
            distributorModel.setPhoneNumber(distributor.getPhoneNumber());
            distributorModels.add(distributorModel);
        });
        return distributorModels;
    }

    public List<ProductBatch> getAllProductBatchInStock(Long distributorId) throws InvalidArgumentException {
        Optional<Distributor> distributorOptional = distributorRepository.findById(distributorId);
        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with ID not exists.");
        }
        Optional<Stock> stockOptional = stockRepository.findByStockOwner(distributorOptional.get().getUnit());
        if (stockOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor does not have any stock.");
        }
        return batchRepository.findAllByStock(stockOptional.get());
    }

    public void deleteDistributor(Long distributorId) throws InvalidArgumentException {
        Optional<Distributor> distributorOptional = distributorRepository.findById(distributorId);
        if (distributorOptional.isEmpty()) {
            throw new InvalidArgumentException("Distributor with ID not exists.");
        }
        distributorRepository.delete(distributorOptional.get());
    }

    @Autowired
    public void setDistributorRepository(DistributorRepository distributorRepository) {
        this.distributorRepository = distributorRepository;
    }
}
