package com.medifind.controller;

import com.medifind.model.Medicine;
import com.medifind.repository.MedicineRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController


@RequestMapping("/medicines")
public class MedicineController {

    private final MedicineRepository repository;

    public MedicineController(MedicineRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Medicine> getMedicines() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Medicine getMedicineById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/search")
    public List<Medicine> searchMedicine(@RequestParam String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    @PostMapping
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        return repository.save(medicine);
    }

    @PutMapping("/{id}")
    public Medicine updateMedicine(
            @PathVariable Long id,
            @RequestBody Medicine updatedMedicine) {

        Medicine medicine = repository.findById(id).orElse(null);

        if (medicine == null) {
            return null;
        }

        medicine.setName(updatedMedicine.getName());
        medicine.setManufacturer(updatedMedicine.getManufacturer());

        return repository.save(medicine);
    }

    @DeleteMapping("/{id}")
    public String deleteMedicine(@PathVariable Long id) {

        if (!repository.existsById(id)) {
            return "Medicine not found!";
        }

        repository.deleteById(id);
        return "Medicine deleted successfully!";
    }
}