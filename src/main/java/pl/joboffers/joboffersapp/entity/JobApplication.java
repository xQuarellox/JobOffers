package pl.joboffers.joboffersapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "job_applications")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private LocalDateTime applicationDate;
    @Column(nullable = false)
    private String phoneNumber;
    @Column(nullable = false)
    private Double expectedWages;
    @Column(nullable = false, length = 2000)
    private String experience;

    private LocalDateTime dateOfInterview;
    @NotNull
    private Boolean isEnd;

    @ManyToOne
    private User user;
    @ManyToOne
    private JobOffer jobOffer;

    public JobApplication() {
    }

    public JobApplication(LocalDateTime applicationDate, String phoneNumber, Double expectedWages, String experience, Boolean isEnd, User user, JobOffer jobOffer) {
        this.applicationDate = applicationDate;
        this.phoneNumber = phoneNumber;
        this.expectedWages = expectedWages;
        this.experience = experience;
        this.isEnd = isEnd;
        this.user = user;
        this.jobOffer = jobOffer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(LocalDateTime applicationDate) {
        this.applicationDate = applicationDate;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Double getExpectedWages() {
        return expectedWages;
    }

    public void setExpectedWages(Double expectedWages) {
        this.expectedWages = expectedWages;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public LocalDateTime getDateOfInterview() {
        return dateOfInterview;
    }

    public void setDateOfInterview(LocalDateTime dateOfInterview) {
        this.dateOfInterview = dateOfInterview;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getEnd() {
        return isEnd;
    }

    public void setEnd(Boolean end) {
        isEnd = end;
    }

    public JobOffer getJobOffer() {
        return jobOffer;
    }

    public void setJobOffer(JobOffer jobOffer) {
        this.jobOffer = jobOffer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JobApplication that = (JobApplication) o;
        return Objects.equals(id, that.id) && Objects.equals(applicationDate, that.applicationDate) && Objects.equals(phoneNumber, that.phoneNumber) && Objects.equals(expectedWages, that.expectedWages) && Objects.equals(experience, that.experience) && Objects.equals(dateOfInterview, that.dateOfInterview) && Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, applicationDate, phoneNumber, expectedWages, experience, dateOfInterview, user);
    }
}
