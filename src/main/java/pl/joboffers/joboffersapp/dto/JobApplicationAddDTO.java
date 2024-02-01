package pl.joboffers.joboffersapp.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class JobApplicationAddDTO {

    @NotNull(message = "{id.not.null}")
    private Long jobOfferId;
    @NotBlank(message = "{phoneNumber.not.blank}")
    private String phoneNumber;
    @NotNull(message = "{wagesFrom.not.null}")
    @Min(value = 1, message = "{wages.min.value}")
    private Double expectedWages;
    @NotBlank(message = "{experience.not.blank}")
    private String experience;

    public JobApplicationAddDTO() {
    }

    public JobApplicationAddDTO(Long jobOfferId, String phoneNumber, Double expectedWages, String experience) {
        this.jobOfferId = jobOfferId;
        this.phoneNumber = phoneNumber;
        this.expectedWages = expectedWages;
        this.experience = experience;
    }

    public Long getJobOfferId() {
        return jobOfferId;
    }

    public void setJobOfferId(Long jobOfferId) {
        this.jobOfferId = jobOfferId;
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
}
