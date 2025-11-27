package com.example.tutorial.controller;

import com.example.tutorial.entity.Department;
import com.example.tutorial.service.DepartmentService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/departments")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    // GET all departments
    @GetMapping
    public List<Department> getAll() {
        return departmentService.getAllDepartments();
    }
}
