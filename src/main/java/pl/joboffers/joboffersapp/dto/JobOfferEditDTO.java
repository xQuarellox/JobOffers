package pl.joboffers.joboffersapp.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public class JobOfferEditDTO {

    @NotNull(message = "{id.not.null}")
    private Long id;
    @NotBlank(message = "{title.not.blank}")
    private String title;
    @NotBlank(message = "{company.not.blank}")
    private String company;
    @NotBlank(message = "{address.not.blank}")
    private String address;
    @NotNull(message = "{wagesFrom.not.null}")
    @Min(value = 1, message = "{wages.min.value}")
    private Double wagesFrom;
    @NotNull(message = "{wagesTo.not.null}")
    @Min(value = 1, message = "{wages.min.value}")
    private Double wagesTo;
    @NotBlank(message = "{description.not.blank}")
    private String description;

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
}
