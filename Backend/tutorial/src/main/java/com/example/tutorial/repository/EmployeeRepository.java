package com.example.tutorial.repository;

import com.example.tutorial.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, String> {

    Optional<Employee> findByEmail(String email);

    long countByDepartment_DepartmentId(Long departmentId);
}
