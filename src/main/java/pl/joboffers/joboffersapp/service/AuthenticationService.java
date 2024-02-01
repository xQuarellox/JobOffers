package pl.joboffers.joboffersapp.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.joboffers.joboffersapp.dto.JwtAuthenticationDTO;
import pl.joboffers.joboffersapp.dto.SignInDTO;
import pl.joboffers.joboffersapp.dto.SignUpDTO;
import pl.joboffers.joboffersapp.dto.UserDTO;
import pl.joboffers.joboffersapp.entity.Role;
import pl.joboffers.joboffersapp.entity.User;
import pl.joboffers.joboffersapp.exception.ExceptionConstant;
import pl.joboffers.joboffersapp.exception.UserException;
import pl.joboffers.joboffersapp.repository.UserRepository;

import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }


    public void signup(SignUpDTO request) throws UserException {
        Optional<User> userByEmail = userRepository.findByEmail(request.getEmail());
        if (userByEmail.isPresent()) {
            throw new UserException(ExceptionConstant.USER_ALREADY_EXISTS);
        }
        User user = new User();
        user.setEmail(request.getEmail());
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new UserException(ExceptionConstant.PASSWORD_MISMATCH);
        }
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.fromRoleName(request.getRoleName()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        userRepository.save(user);
    }


    public JwtAuthenticationDTO signin(SignInDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException(ExceptionConstant.INVALID_EMAIL_OR_PASSWORD));
        var jwt = jwtService.generateToken(user);
        return new JwtAuthenticationDTO(jwt);
    }

    public UserDTO getUser(String name) throws UserException {
        Optional<User> userOpt = userRepository.findByEmail(name);
        User user = userOpt.orElseThrow(() -> new UserException(ExceptionConstant.USER_NOT_FOUND));
        return new UserDTO(user.getUsername(), user.getFirstName(), user.getLastName(), user.getRole().getRoleName());
    }
}


