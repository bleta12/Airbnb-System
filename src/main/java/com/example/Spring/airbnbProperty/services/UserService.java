package com.example.Spring.airbnbProperty.services;


import com.example.Spring.airbnbProperty.exception.UserNotFoundException;
import com.example.Spring.airbnbProperty.models.AirbnbProperty;
import com.example.Spring.airbnbProperty.models.User;
import com.example.Spring.airbnbProperty.models.dtos.TokenResponse;
import com.example.Spring.airbnbProperty.models.dtos.UserDTO;
import com.example.Spring.airbnbProperty.models.dtos.UserProfilePasswordUpdateDto;
import com.example.Spring.airbnbProperty.models.enums.Role;
import com.example.Spring.airbnbProperty.repository.AirbnbRepositoryInterface;
import com.example.Spring.airbnbProperty.repository.UserRepositoryInterface;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService  {

    private final UserRepositoryInterface repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    private final AirbnbRepositoryInterface airbnbRepo;


    @Autowired
    public UserService(UserRepositoryInterface repositoryInterface, AirbnbRepositoryInterface airbnbRepo) {
        this.repo = repositoryInterface;
        this.airbnbRepo = airbnbRepo;
    }

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JWTService jwtService;


    // get insert delete
    public User insertOne(User user) throws BadRequestException {
        if(user.getName() == null){
            throw new BadRequestException("Name must be supplied!");
        }
        if(user.getPassword()==null){
            throw new BadRequestException("Password must be supplied!");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        return repo.save(user);
    }

    public UserDTO getUserProfileById(Long id) throws UserNotFoundException {

        Optional<UserDTO> user = repo.findUserProfileData(id);
        if (user.isPresent()) {
            return user.get();
           /* return new UserDTO(u.getId(),u.getName(), u.getLastname(),u.getEmail(), u.getUsername(), u.getPhoneNumber(), u.getProfilePicture(), u.getFacebook(), u.getInstagram(), u.getSnapchat(), u.getTwitter());*/
        } else {
            throw new UserNotFoundException("User not found with id: " + id);
        }
    }

    public List<User> getAllUsers() {
        return (List<User>) repo.findAll();
    }

    public UserDTO updateUserProfile(Long id, UserProfilePasswordUpdateDto userProfilePasswordUpdateDto) throws UserNotFoundException {

        User existingUser = repo.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

       if (userProfilePasswordUpdateDto.getPassword() != null) {
           String currentPassword = userProfilePasswordUpdateDto.getPassword().getCurrentPassword();
           String newPassword = userProfilePasswordUpdateDto.getPassword().getNewPassword();

        if (newPassword != null && currentPassword == null) {
            throw new IllegalArgumentException("Current password is required to update the password");
        }
           if (newPassword == null && currentPassword != null) {
               throw new IllegalArgumentException("New password is required to update the password");
           }
        String storedPassword = repo.findPasswordById(id).orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        if (newPassword != null) {

            boolean matches = encoder.matches(currentPassword, storedPassword);
            if (!matches) {
                throw new IllegalArgumentException("Current password does not match");
            }

            String encodedNewPassword = encoder.encode(newPassword);
            repo.updatePassword(id, encodedNewPassword);
        }}

        if (userProfilePasswordUpdateDto.getUser().getEmail() != null) {
            existingUser.setEmail(userProfilePasswordUpdateDto.getUser().getEmail());
        }else {
            throw new IllegalArgumentException("Email should not be null");
        }
        existingUser.setPhoneNumber(userProfilePasswordUpdateDto.getUser().getPhoneNumber());
        existingUser.setFacebook(userProfilePasswordUpdateDto.getUser().getFacebook());
        existingUser.setInstagram(userProfilePasswordUpdateDto.getUser().getInstagram());
        existingUser.setSnapchat(userProfilePasswordUpdateDto.getUser().getSnapchat());
        existingUser.setTwitter(userProfilePasswordUpdateDto.getUser().getTwitter());

        repo.save(existingUser);

        return new UserDTO(
                existingUser.getId(),
                existingUser.getName(),
                existingUser.getLastname(),
                existingUser.getEmail(),
                existingUser.getUsername(),
                existingUser.getPhoneNumber(),
                existingUser.getProfilePicture(),
                existingUser.getFacebook(),
                existingUser.getInstagram(),
                existingUser.getSnapchat(),
                existingUser.getTwitter()
        );
    }

    public void deleteUser(Long id) throws UserNotFoundException {
        if (repo.existsById(id)) {
            repo.deleteById(id);
        } else {
            throw new UserNotFoundException("User not found with id: " + id);
        }
    }


    public TokenResponse verify(User user) {
        try {

            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            if (authentication.isAuthenticated()) {
                User completeUser = repo.findByUsername(user.getUsername());
                if (completeUser == null) {
                    throw new UsernameNotFoundException("User not found");
                }
                String access="accessToken";
                String refresh="refreshToken";

                String accessToken = jwtService.generateToken(completeUser.getUsername(), completeUser.getId(), completeUser.getRole(),access);
                String refreshToken = jwtService.generateToken(completeUser.getUsername(), completeUser.getId(),completeUser.getRole(),refresh);

                return new TokenResponse(accessToken, refreshToken);
            }
            throw new BadCredentialsException("Authentication failed");
        } catch (Exception e) {
            throw new RuntimeException("Authentication error: " + e.getMessage(), e);
        }
    }


    public Optional<User> insertPhoto(User user) {

        long id = user.getId();
        String photo = user.getProfilePicture();
        int updateId= repo.updateProfilePicture(id,photo);
        return repo.findById((long) updateId);


    }

    public UserDTO getOwner(int propertyId) {

        AirbnbProperty property = airbnbRepo.getById(propertyId);
         long userId = property.getUser().getId();
           System.out.println(userId);
        return repo.findUserProfileData(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

    }
}

