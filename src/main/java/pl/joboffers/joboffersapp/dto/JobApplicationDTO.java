package pl.joboffers.joboffersapp.dto;

import java.time.LocalDateTime;

public class JobApplicationDTO {

    private Long id;
    private LocalDateTime applicationDate;
    private String phoneNumber;
    private Double expectedWages;
    private String experience;
    private LocalDateTime dateOfInterview;
    private Boolean isEnd;
    private UserDTO applicationUser;

    private JobOfferDTO jobOffer;

    public JobApplicationDTO() {
    }

    public JobApplicationDTO(Long id, LocalDateTime applicationDate, String phoneNumber, Double expectedWages, String experience, LocalDateTime dateOfInterview, Boolean isEnd, UserDTO applicationUser, JobOfferDTO jobOffer) {
        this.id = id;
        this.applicationDate = applicationDate;
        this.phoneNumber = phoneNumber;
        this.expectedWages = expectedWages;
        this.experience = experience;
        this.dateOfInterview = dateOfInterview;
        this.isEnd = isEnd;
        this.applicationUser = applicationUser;
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

    public Boolean getEnd() {
        return isEnd;
    }

    public void setEnd(Boolean end) {
        isEnd = end;
    }

    public UserDTO getApplicationUser() {
        return applicationUser;
    }

    public void setApplicationUser(UserDTO applicationUser) {
        this.applicationUser = applicationUser;
    }

    public JobOfferDTO getJobOffer() {
        return jobOffer;
    }

    public void setJobOffer(JobOfferDTO jobOffer) {
        this.jobOffer = jobOffer;
    }
}
