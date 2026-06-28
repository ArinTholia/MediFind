package com.medifind.dto;

public class DashboardResponse {

    private long totalMedicines;
    private long totalUsers;
    private long lowStockMedicines;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalMedicines,
                             long totalUsers,
                             long lowStockMedicines) {

        this.totalMedicines = totalMedicines;
        this.totalUsers = totalUsers;
        this.lowStockMedicines = lowStockMedicines;
    }

    public long getTotalMedicines() {
        return totalMedicines;
    }

    public void setTotalMedicines(long totalMedicines) {
        this.totalMedicines = totalMedicines;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getLowStockMedicines() {
        return lowStockMedicines;
    }

    public void setLowStockMedicines(long lowStockMedicines) {
        this.lowStockMedicines = lowStockMedicines;
    }
}