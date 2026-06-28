package com.medifind.controller;

import com.medifind.dto.DashboardResponse;
import com.medifind.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping("/dashboard")
    public DashboardResponse dashboard() {
        return service.getDashboardData();
    }
}