package pl.joboffers.joboffersapp.service;

import org.springframework.stereotype.Service;
import pl.joboffers.joboffersapp.dto.JobApplicationAddDTO;
import pl.joboffers.joboffersapp.dto.JobApplicationDTO;
import pl.joboffers.joboffersapp.dto.JobApplicationSetDateDTO;
import pl.joboffers.joboffersapp.dto.UserDTO;
import pl.joboffers.joboffersapp.entity.JobApplication;
import pl.joboffers.joboffersapp.entity.JobOffer;
import pl.joboffers.joboffersapp.entity.Role;
import pl.joboffers.joboffersapp.entity.User;
import pl.joboffers.joboffersapp.exception.ExceptionConstant;
import pl.joboffers.joboffersapp.exception.JobApplicationException;
import pl.joboffers.joboffersapp.exception.JobOfferException;
import pl.joboffers.joboffersapp.exception.UserException;
import pl.joboffers.joboffersapp.repository.JobApplicationRepository;
import pl.joboffers.joboffersapp.repository.JobOfferRepository;
import pl.joboffers.joboffersapp.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class JobApplicationService {

    private final UserRepository userRepository;
    private final JobOfferRepository jobOfferRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final JobOfferService jobOfferService;

    public JobApplicationService(UserRepository userRepository, JobOfferRepository jobOfferRepository, JobApplicationRepository jobApplicationRepository, JobOfferService jobOfferService) {
        this.userRepository = userRepository;
        this.jobOfferRepository = jobOfferRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.jobOfferService = jobOfferService;
    }

    public List<JobApplicationDTO> getApplicationById(Long id, String username) throws UserException, JobOfferException, JobApplicationException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserException(ExceptionConstant.USER_NOT_FOUND));
        JobOffer jobOffer = jobOfferRepository.findById(id).orElseThrow(() -> new JobOfferException(ExceptionConstant.JOB_OFFER_NOT_FOUND));
        Role role = user.getRole();
        if (role != Role.RECRUITER) {
            throw new JobApplicationException(ExceptionConstant.NO_AUTHORITY);
        }
        if (!jobOffer.getUser().equals(user)) {
            throw new JobApplicationException(ExceptionConstant.NOT_OWNER);
        }
        List<JobApplication> jobApplications = jobOffer.getJobApplications();
        return getJobApplicationDTOS(jobApplications);

    }

    public List<JobApplicationDTO> getUserApplication(String username) throws UserException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserException(ExceptionConstant.USER_NOT_FOUND));
        List<JobApplication> jobApplications = user.getJobApplication();
        return getJobApplicationDTOS(jobApplications);
    }

    public void add(JobApplicationAddDTO dto, String username) throws UserException, JobApplicationException, JobOfferException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserException(ExceptionConstant.USER_NOT_FOUND));
        Role role = user.getRole();
        if (role != Role.EMPLOYEE) {
            throw new JobApplicationException(ExceptionConstant.NO_AUTHORITY);
        }
        JobOffer jobOffer = jobOfferRepository.findById(dto.getJobOfferId()).orElseThrow(() -> new JobOfferException(ExceptionConstant.JOB_OFFER_NOT_FOUND));
        JobApplication jobApplication = new JobApplication(LocalDateTime.now(), dto.getPhoneNumber(), dto.getExpectedWages(), dto.getExperience(), false, user, jobOffer);
        jobApplicationRepository.save(jobApplication);
    }

    public void end(Long id, String username) throws JobApplicationException, UserException, JobOfferException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserException(ExceptionConstant.USER_NOT_FOUND));
        JobApplication jobApplication = jobApplicationRepository.findById(id).orElseThrow(() -> new JobApplicationException(ExceptionConstant.APPLICATION_NOT_FOUND));
        Role role = user.getRole();
        if (role != Role.RECRUITER) {
            throw new JobApplicationException(ExceptionConstant.NO_AUTHORITY);
        }
        if (!jobApplication.getJobOffer().getUser().equals(user)) {
            throw new JobApplicationException(ExceptionConstant.NOT_OWNER);
        }
        jobApplication.setEnd(true);
        jobApplicationRepository.save(jobApplication);
    }

    public void setInterviewDateTime(JobApplicationSetDateDTO dto, String username) throws UserException, JobApplicationException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserException(ExceptionConstant.USER_NOT_FOUND));
        JobApplication jobApplication = jobApplicationRepository.findById(dto.getId()).orElseThrow(() -> new JobApplicationException(ExceptionConstant.APPLICATION_NOT_FOUND));
        Role role = user.getRole();
        if (role != Role.RECRUITER) {
            throw new JobApplicationException(ExceptionConstant.NO_AUTHORITY);
        }
        if (!jobApplication.getJobOffer().getUser().equals(user)) {
            throw new JobApplicationException(ExceptionConstant.NOT_OWNER);
        }
        jobApplication.setDateOfInterview(dto.getDateTime());
        jobApplicationRepository.save(jobApplication);
    }

    private List<JobApplicationDTO> getJobApplicationDTOS(List<JobApplication> jobApplications) {
        List<JobApplicationDTO> jobApplicationDTOS = new ArrayList<>();
        for (JobApplication ja : jobApplications) {
            JobApplicationDTO jobApplicationDTO = new JobApplicationDTO();
            UserDTO userDTO = new UserDTO(ja.getUser().getUsername(), ja.getUser().getFirstName(), ja.getUser().getLastName(), ja.getUser().getRole().getRoleName());
            jobApplicationDTO.setId(ja.getId());
            jobApplicationDTO.setApplicationDate(ja.getApplicationDate());
            jobApplicationDTO.setPhoneNumber(ja.getPhoneNumber());
            jobApplicationDTO.setExpectedWages(ja.getExpectedWages());
            jobApplicationDTO.setExperience(ja.getExperience());
            jobApplicationDTO.setDateOfInterview(ja.getDateOfInterview());
            jobApplicationDTO.setEnd(ja.getEnd());
            jobApplicationDTO.setApplicationUser(userDTO);
            jobApplicationDTO.setJobOffer(jobOfferService.getJobOfferDTO(ja.getJobOffer()));
            jobApplicationDTOS.add(jobApplicationDTO);
        }
        return jobApplicationDTOS;
    }
}
