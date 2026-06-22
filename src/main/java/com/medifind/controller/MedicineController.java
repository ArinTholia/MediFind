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

    // GET ALL MEDICINES
    @GetMapping
    public List<Medicine> getMedicines() {
        return repository.findAll();
    }

    // GET MEDICINE BY ID
    @GetMapping("/{id}")
    public Medicine getMedicineById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    // SEARCH BY MEDICINE NAME
    @GetMapping("/search")
    public List<Medicine> searchMedicine(
            @RequestParam("name") String name) {

        return repository.findByNameContainingIgnoreCase(name);
    }

    // SEARCH BY LOCATION
    @GetMapping("/location")
    public List<Medicine> searchByLocation(
            @RequestParam("location") String location) {

        return repository.findByLocationContainingIgnoreCase(location);
    }

    // SEARCH BY PHARMACY
    @GetMapping("/pharmacy")
    public List<Medicine> searchByPharmacy(
            @RequestParam("pharmacy") String pharmacy) {

        return repository.findByPharmacyNameContainingIgnoreCase(pharmacy);
    }

    // ADD NEW MEDICINE
    @PostMapping
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        return repository.save(medicine);
    }

    // UPDATE MEDICINE
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
        medicine.setPrice(updatedMedicine.getPrice());
        medicine.setStock(updatedMedicine.getStock());
        medicine.setPharmacyName(updatedMedicine.getPharmacyName());
        medicine.setLocation(updatedMedicine.getLocation());

        return repository.save(medicine);
    }

    // DELETE MEDICINE
    @DeleteMapping("/{id}")
    public String deleteMedicine(@PathVariable Long id) {

        if (!repository.existsById(id)) {
            return "Medicine not found!";
        }

        repository.deleteById(id);

        return "Medicine deleted successfully!";
    }
}