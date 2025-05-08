package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.Department;
import org.springframework.data.repository.CrudRepository;

public interface DepartmentRepositoryInterface extends CrudRepository<Department, Long> {
}

