package com.medifind.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    // Secret key (change this to a long random string in production)
    private static final String SECRET_KEY =
            "medifind-secret-key-12345678901234567890";

    // Token validity (24 hours)
    private static final long EXPIRATION_TIME =
            1000 * 60 * 60 * 24;

    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(
                        io.jsonwebtoken.security.Keys.hmacShaKeyFor(
                                SECRET_KEY.getBytes()
                        )
                )
                .compact();
    }
}