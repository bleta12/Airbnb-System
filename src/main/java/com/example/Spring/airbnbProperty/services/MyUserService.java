package com.example.Spring.airbnbProperty.services;

import com.example.Spring.airbnbProperty.models.MyUser;
import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.models.enums.Role;
import com.example.Spring.airbnbProperty.repository.UserRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class MyUserService implements UserDetailsService {

    @Autowired
    private UserRepositoryInterface repo;


    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user= repo.findByUsername(username);
        System.out.println(user);
        if (user==null) {
            System.out.println("User 404");
            throw new UsernameNotFoundException("User 404");
        }
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }
        System.out.println("Loaded user: " + user.getUsername() + " with role: " + user.getRole().name());

        return new MyUser(user);
    }

}

