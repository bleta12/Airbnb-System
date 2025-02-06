package com.example.Spring.airbnbProperty.repository;


import com.example.Spring.airbnbProperty.models.UserManagement;
/*import com.example.usermenagment.model.User;*/
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserManagementRepository extends JpaRepository<UserManagement, Long> {
}
