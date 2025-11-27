package com.example.tutorial.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor

public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employee_id;

    private String first_name;

    private String last_name;

    @Column(unique = true, nullable = false)
    private String email;   // OAuth email

    private String title;

    private String photograph_path; // file path, NOT blob

    private String role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departmentId")
    @ToString.Exclude   // prevents infinite recursion
    private Department department;
}
