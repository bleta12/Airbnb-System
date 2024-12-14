package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.models.enums.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepositoryInterface extends CrudRepository<User,Long> {

          User findByUsername(String username);


      //    List<User> findByRole(Role role);


}