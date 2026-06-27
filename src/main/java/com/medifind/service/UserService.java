package com.medifind.service;

import com.medifind.repository.UserRepository;
import com.medifind.user.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public UserService(UserRepository repository,
                       PasswordEncoder encoder,
                       JwtService jwtService) {

        this.repository = repository;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    public User register(User user) {

        if (repository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        user.setPassword(
                encoder.encode(user.getPassword())
        );

        return repository.save(user);
    }

    public String login(String email, String password) {

        User user = repository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return jwtService.generateToken(user.getEmail());
    }
}