package com.medifind.controller;

import com.medifind.model.Medicine;
import com.medifind.service.MedicineService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/medicines")
public class MedicineController {

    private final MedicineService service;

    public MedicineController(MedicineService service) {
        this.service = service;
    }

    @GetMapping
    public List<Medicine> getMedicines() {
        return service.getAllMedicines();
    }

    @GetMapping("/id/{id}")
    public Medicine getMedicineById(@PathVariable Long id) {

        Medicine medicine = service.getMedicineById(id);

        if (medicine == null) {
            throw new RuntimeException("Medicine not found");
        }

        return medicine;
    }

    @PostMapping
    public Medicine addMedicine(
            @Valid @RequestBody Medicine medicine) {

        return service.saveMedicine(medicine);
    }

    @PutMapping("/{id}")
    public Medicine updateMedicine(
            @PathVariable Long id,
            @Valid @RequestBody Medicine updatedMedicine) {

        Medicine medicine = service.getMedicineById(id);

        if (medicine == null) {
            throw new RuntimeException("Medicine not found");
        }

        medicine.setName(updatedMedicine.getName());
        medicine.setManufacturer(updatedMedicine.getManufacturer());
        medicine.setPrice(updatedMedicine.getPrice());
        medicine.setStock(updatedMedicine.getStock());
        medicine.setPharmacyName(updatedMedicine.getPharmacyName());
        medicine.setLocation(updatedMedicine.getLocation());

        return service.saveMedicine(medicine);
    }

    @DeleteMapping("/{id}")
    public String deleteMedicine(@PathVariable Long id) {

        if (service.getMedicineById(id) == null) {
            throw new RuntimeException("Medicine not found");
        }

        service.deleteMedicine(id);

        return "Medicine deleted successfully";
    }

    @GetMapping("/search")
    public List<Medicine> searchMedicine(@RequestParam String name) {
        return service.searchByName(name);
    }

    @GetMapping("/location")
    public List<Medicine> searchByLocation(@RequestParam String location) {
        return service.searchByLocation(location);
    }

    @GetMapping("/pharmacy")
    public List<Medicine> searchByPharmacy(@RequestParam String pharmacy) {
        return service.searchByPharmacy(pharmacy);
    }

    @GetMapping("/low-stock")
    public List<Medicine> lowStockMedicines() {
        return service.getLowStockMedicines();
    }

    @GetMapping("/count")
    public long medicineCount() {
        return service.getMedicineCount();
    }

    @GetMapping("/sort/price-asc")
    public List<Medicine> sortPriceAsc() {

        List<Medicine> medicines = service.getAllMedicines();

        medicines.sort(
                Comparator.comparing(
                        Medicine::getPrice,
                        Comparator.nullsLast(Double::compareTo)
                )
        );

        return medicines;
    }

    @GetMapping("/sort/price-desc")
    public List<Medicine> sortPriceDesc() {

        List<Medicine> medicines = service.getAllMedicines();

        medicines.sort(
                Comparator.comparing(
                        Medicine::getPrice,
                        Comparator.nullsLast(Double::compareTo)
                ).reversed()
        );

        return medicines;
    }
}