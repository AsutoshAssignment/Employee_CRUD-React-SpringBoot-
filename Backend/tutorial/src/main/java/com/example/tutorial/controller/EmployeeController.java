package com.example.tutorial.controller;

import com.example.tutorial.entity.Employee;
import com.example.tutorial.service.EmployeeService;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // GET all employees
    @GetMapping
    public List<Employee> getAll() {
        return employeeService.getAllEmployees();
    }

    // GET employee by ID
    @GetMapping("/{id}")
    public Employee getOne(@PathVariable String id) {

        return employeeService.getEmployeeById(id);
    }
    @GetMapping("/me")
    public Employee getMyProfile(Authentication authentication) {
        System.out.println(authentication.getName());
        String email = authentication.getName();

        return employeeService.findByEmail(email);
    }



    // CREATE employee
    @PostMapping
    public Employee create(@RequestBody Employee employee) {

        return employeeService.createEmployee(employee, employee.getDepartment().getDepartmentId());
    }


    // UPDATE employee
    @PutMapping("/{id}")
    public Employee update(@PathVariable String id,
                           @RequestBody Employee employee) {
        System.out.println(employee.getDepartment().getDepartmentId());
        return employeeService.updateEmployee(id, employee,employee.getDepartment().getDepartmentId());
    }

    // DELETE employee
    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        employeeService.deleteEmployee(id);
        return "Employee deleted";
    }
}
