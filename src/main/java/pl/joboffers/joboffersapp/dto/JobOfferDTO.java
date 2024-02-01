package pl.joboffers.joboffersapp.dto;

import java.time.LocalDateTime;

public class JobOfferDTO {

    private Long id;
    private String title;
    private String company;
    private String address;
    private Double wagesFrom;
    private Double wagesTo;
    private String description;
    private LocalDateTime created;
    private boolean isActive;

    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getWagesFrom() {
        return wagesFrom;
    }

    public void setWagesFrom(Double wagesFrom) {
        this.wagesFrom = wagesFrom;
    }

    public Double getWagesTo() {
        return wagesTo;
    }

    public void setWagesTo(Double wagesTo) {
        this.wagesTo = wagesTo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}
