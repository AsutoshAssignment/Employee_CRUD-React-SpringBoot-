package com.example.tutorial.service;

import com.example.tutorial.entity.Department;
import com.example.tutorial.entity.Employee;
import com.example.tutorial.repository.DepartmentRepository;
import com.example.tutorial.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    // ---------------- CREATE EMPLOYEE ----------------
    public Employee createEmployee(Employee employee, Long departmentId) {

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        long currentCount = employeeRepository.countByDepartment_DepartmentId(departmentId);
        System.out.println(employee);
        System.out.println(department);
        System.out.println(currentCount);

        if (currentCount >= department.getCapacity()) {
            throw new RuntimeException("Department is full. Cannot add new employee.");
        }

        employee.setDepartment(department);
        return employeeRepository.save(employee);
    }

   //All
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // one
    public Employee getEmployeeById(String id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }


    public Employee updateEmployee(String id, Employee updated, Long departmentId) {

        Employee existing = getEmployeeById(id);

        Department newDepartment = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        boolean deptChanged =
                !existing.getDepartment().getDepartmentId().equals(departmentId);

        if (deptChanged) {
            long count = employeeRepository.countByDepartment_DepartmentId(departmentId);
            if (count >= newDepartment.getCapacity()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Full"
                );



//               throw  new ResponseStatusException(HttpStatus.BAD_REQUEST,"Full Capacity");
         //throw new RuntimeException("Department is full. Cannot move employee.");
            }
        }

        existing.setEmployee_id(updated.getEmployee_id());
        existing.setFirst_name(updated.getFirst_name());
         existing.setLast_name(updated.getLast_name());

         existing.setTitle(updated.getTitle());
        existing.setEmail(updated.getEmail());
         existing.setPhotograph_path(updated.getPhotograph_path());
        existing.setDepartment(newDepartment);

        return employeeRepository.save(existing);
    }

    public void deleteEmployee(String id) {
        employeeRepository.deleteById(id);
    }

    public Employee findByEmail(String email) {
        return employeeRepository.findByEmail(email).orElse(null);
    }
}
