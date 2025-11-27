package com.example.tutorial.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;

import java.util.Date;

@Component
public class JwtTokenProvider {

    // For assignment, this is fine. In real apps, move to config.
    private final String JWT_SECRET = "MY_SUPER_SECRET_KEY_1234567890_987654321";

    private final long JWT_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 1 day

    public String generateToken(String email, String name) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION_MS);

        return Jwts.builder()
                .setSubject(email)
                .claim("name", name)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(Keys.hmacShaKeyFor(JWT_SECRET.getBytes()), SignatureAlgorithm.HS256)

                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(Keys.hmacShaKeyFor(JWT_SECRET.getBytes()))
                    .parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(Keys.hmacShaKeyFor(JWT_SECRET.getBytes()))
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public String getNameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(Keys.hmacShaKeyFor(JWT_SECRET.getBytes()))
                .parseClaimsJws(token)
                .getBody();
        return claims.get("name", String.class);
    }

}
