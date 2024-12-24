package com.example.Spring.airbnbProperty.resources;
import com.example.Spring.airbnbProperty.models.MyUser;
import com.example.Spring.airbnbProperty.models.dtos.TokenRefreshRequest;
import com.example.Spring.airbnbProperty.models.dtos.TokenRefreshResponse;
import com.example.Spring.airbnbProperty.models.enums.Role;
import com.example.Spring.airbnbProperty.services.JWTService;
import com.example.Spring.airbnbProperty.services.MyUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthResource {





        private final JWTService jwtService;
        private final MyUserService myUserService;

        public AuthResource(JWTService jwtService, MyUserService myUserService) {
            this.jwtService = jwtService;
            this.myUserService = myUserService;
        }

        @PostMapping("/refresh")
        public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest request) {
            String refreshToken = request.getRefreshToken();

            String username = jwtService.extractUserName(refreshToken);
            MyUser userDetails = (MyUser) myUserService.loadUserByUsername(username);

            if (userDetails == null || !jwtService.validateToken(refreshToken, userDetails)) {
                return ResponseEntity.status(401).body("Invalid or expired refresh token");
            }

            long id = userDetails.getId();
            Role role = userDetails.getRole();
            String newAccessToken = jwtService.generateToken(username, id, role,"accessToken");

            return ResponseEntity.ok(new TokenRefreshResponse(newAccessToken));
        }
}