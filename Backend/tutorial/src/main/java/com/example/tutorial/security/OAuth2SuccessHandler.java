package com.example.tutorial.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // React app URL
    private final String FRONTEND_REDIRECT_URL = "http://localhost:3000/auth/callback";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {

        DefaultOAuth2User oauthUser = (DefaultOAuth2User) authentication.getPrincipal();

        String email = (String) oauthUser.getAttribute("email");
        String name = (String) oauthUser.getAttribute("name");

        String token = jwtTokenProvider.generateToken(email, name);

        String redirectUrl = FRONTEND_REDIRECT_URL + "?token=" + token;
//        System.out.println(redirectUrl);
        response.sendRedirect(redirectUrl);
    }
}
