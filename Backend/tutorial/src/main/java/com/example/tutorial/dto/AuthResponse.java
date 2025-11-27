package com.example.tutorial.dto;

import com.example.tutorial.entity.Employee;
import lombok.Data;

@Data
public class AuthResponse {
    private boolean employeeExists;
    private String email;
    private String name;
    private Employee employee;
}
