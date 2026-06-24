package com.medifind.service;

import com.medifind.model.Medicine;
import com.medifind.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {

    private final MedicineRepository repository;

    public MedicineService(MedicineRepository repository) {
        this.repository = repository;
    }

    public List<Medicine> getAllMedicines() {
        return repository.findAll();
    }

    public Medicine getMedicineById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Medicine saveMedicine(Medicine medicine) {
        return repository.save(medicine);
    }

    public void deleteMedicine(Long id) {
        repository.deleteById(id);
    }

    public List<Medicine> searchByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    public List<Medicine> searchByLocation(String location) {
        return repository.findByLocationContainingIgnoreCase(location);
    }

    public List<Medicine> searchByPharmacy(String pharmacy) {
        return repository.findByPharmacyNameContainingIgnoreCase(pharmacy);
    }

    public List<Medicine> getLowStockMedicines() {
        return repository.findByStockLessThan(50);
    }

    public long getMedicineCount() {
        return repository.count();
    }
}