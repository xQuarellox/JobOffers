package pl.joboffers.joboffersapp.dto;

public class JwtAuthenticationDTO {

    private String token;
    public JwtAuthenticationDTO() {
    }

    public JwtAuthenticationDTO(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
