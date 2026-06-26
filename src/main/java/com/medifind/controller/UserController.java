package com.medifind.controller;

import com.medifind.service.UserService;
import com.medifind.user.User;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // Register API
    @PostMapping("/register")
    public User register(@Valid @RequestBody User user) {
        return service.register(user);
    }

    // Login API
    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {

        return service.login(
                loginUser.getEmail(),
                loginUser.getPassword()
        );
    }
}