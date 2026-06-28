package com.medifind.service;

import com.medifind.dto.DashboardResponse;
import com.medifind.repository.MedicineRepository;
import com.medifind.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final MedicineRepository medicineRepository;
    private final UserRepository userRepository;

    public DashboardService(MedicineRepository medicineRepository,
                            UserRepository userRepository) {
        this.medicineRepository = medicineRepository;
        this.userRepository = userRepository;
    }

    public DashboardResponse getDashboardData() {

        long totalMedicines = medicineRepository.count();

        long totalUsers = userRepository.count();

        long lowStockMedicines =
                medicineRepository.findByStockLessThan(50).size();

        return new DashboardResponse(
                totalMedicines,
                totalUsers,
                lowStockMedicines
        );
    }
}