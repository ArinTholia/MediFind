package com.medifind.repository;

import com.medifind.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    List<Medicine> findByNameContainingIgnoreCase(String name);

    List<Medicine> findByLocationContainingIgnoreCase(String location);

    List<Medicine> findByPharmacyNameContainingIgnoreCase(String pharmacyName);

    List<Medicine> findAllByOrderByPriceAsc();

    List<Medicine> findAllByOrderByPriceDesc();

    List<Medicine> findByStockLessThan(Integer stock);
}