package pl.joboffers.joboffersapp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignUpDTO {

    @Email(message = "{email.invalid}")
    private String email;
    @NotBlank(message = "{password.not.blank}")
    @Size(min = 5, message = "{password.too.short}")
    private String password;
    @NotBlank(message = "{password.not.blank}")
    @Size(min = 5, message = "{password.too.short}")
    private String confirmPassword;
    @NotBlank(message = "{firstName.not.blank}")
    private String firstName;
    @NotBlank(message = "{lastName.not.blank}")
    private String lastName;
    private String roleName;

    public SignUpDTO() {
    }

    public SignUpDTO(String email, String password, String confirmPassword, String firstName, String lastName, String roleName) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleName = roleName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
