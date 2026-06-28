package com.medifind.service;

import com.medifind.security.JwtUtil;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final JwtUtil jwtUtil;

    public JwtService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public String generateToken(String email) {
        return jwtUtil.generateToken(email);
    }

    public String extractUsername(String token) {
        return jwtUtil.extractUsername(token);
    }

    public boolean validateToken(String token) {
        return jwtUtil.isTokenValid(token);
    }
}