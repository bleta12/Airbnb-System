package com.example.Spring.airbnbProperty.repository;

import com.example.Spring.airbnbProperty.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepositoryInterface extends CrudRepository<User,Long> {


}