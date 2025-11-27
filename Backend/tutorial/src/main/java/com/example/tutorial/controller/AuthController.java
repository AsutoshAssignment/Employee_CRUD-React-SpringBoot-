package com.example.tutorial.controller;

import com.example.tutorial.dto.AuthResponse;
import com.example.tutorial.entity.Employee;
import com.example.tutorial.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private EmployeeService employeeService;

    // Returns details of logged-in user from JWT
    @GetMapping("/me")
    public AuthResponse getCurrentUser(Authentication authentication) {

        if (authentication == null) {
            throw new RuntimeException("Not authenticated");
        }

        String email = authentication.getName(); // from JWT filter

        Employee emp = employeeService.findByEmail(email);
        AuthResponse response = new AuthResponse();

        if (emp == null) {
            response.setEmployeeExists(false);
            response.setEmail(email);
            response.setName(""); // no name available from JWT
        } else {
            response.setEmployeeExists(true);
            response.setEmployee(emp);
            response.setEmail(emp.getEmail());
            response.setName(emp.getFirst_name() + " " + emp.getLast_name());
        }

        return response;
    }


}
