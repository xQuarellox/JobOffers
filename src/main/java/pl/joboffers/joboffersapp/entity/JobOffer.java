package pl.joboffers.joboffersapp.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "job_offers")
public class JobOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String company;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private Double wagesFrom;
    @Column(nullable = false)
    private Double wagesTo;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private LocalDateTime created;
    @Column(nullable = true)
    private boolean isActive;
    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "jobOffer")
    private List<JobApplication> jobApplications;

    public JobOffer() {
    }

    public JobOffer(String title, String company, String address, Double wagesFrom, Double wagesTo, String description, LocalDateTime created, boolean isActive, User user) {
        this.title = title;
        this.company = company;
        this.address = address;
        this.wagesFrom = wagesFrom;
        this.wagesTo = wagesTo;
        this.description = description;
        this.created = created;
        this.isActive = isActive;
        this.user = user;
    }

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<JobApplication> getJobApplications() {
        return jobApplications;
    }

    public void setJobApplications(List<JobApplication> jobApplications) {
        this.jobApplications = jobApplications;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JobOffer jobOffer = (JobOffer) o;
        return Objects.equals(id, jobOffer.id) && Objects.equals(title, jobOffer.title) && Objects.equals(company, jobOffer.company) && Objects.equals(address, jobOffer.address) && Objects.equals(wagesFrom, jobOffer.wagesFrom) && Objects.equals(wagesTo, jobOffer.wagesTo) && Objects.equals(description, jobOffer.description) && Objects.equals(created, jobOffer.created) && Objects.equals(user, jobOffer.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, company, address, wagesFrom, wagesTo, description, created, user);
    }
}
