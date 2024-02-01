package pl.joboffers.joboffersapp.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.joboffers.joboffersapp.dto.JwtAuthenticationDTO;
import pl.joboffers.joboffersapp.dto.SignInDTO;
import pl.joboffers.joboffersapp.dto.SignUpDTO;
import pl.joboffers.joboffersapp.dto.UserDTO;
import pl.joboffers.joboffersapp.entity.Role;
import pl.joboffers.joboffersapp.exception.UserException;
import pl.joboffers.joboffersapp.service.AuthenticationService;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody @Valid SignUpDTO request) throws UserException {
        authenticationService.signup(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationDTO> signin(@RequestBody SignInDTO request) {
        return ResponseEntity.ok(authenticationService.signin(request));
    }

    @GetMapping("/roles")
    public ResponseEntity<List<String>> getAllRoles() {
        List<String> roles = Arrays.stream(Role.values())
                .map(Role::getRoleName)
                .collect(Collectors.toList());
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/user")
    public ResponseEntity<UserDTO> getUser(Principal principal) throws UserException {
        UserDTO user = authenticationService.getUser(principal.getName());
        return ResponseEntity.ok(user);
    }

}
