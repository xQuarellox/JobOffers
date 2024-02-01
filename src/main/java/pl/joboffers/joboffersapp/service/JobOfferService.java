package pl.joboffers.joboffersapp.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pl.joboffers.joboffersapp.dto.JobOfferAddDTO;
import pl.joboffers.joboffersapp.dto.JobOfferDTO;
import pl.joboffers.joboffersapp.dto.JobOfferEditDTO;
import pl.joboffers.joboffersapp.dto.UserDTO;
import pl.joboffers.joboffersapp.entity.JobOffer;
import pl.joboffers.joboffersapp.entity.Role;
import pl.joboffers.joboffersapp.entity.User;
import pl.joboffers.joboffersapp.exception.ExceptionConstant;
import pl.joboffers.joboffersapp.exception.JobOfferException;
import pl.joboffers.joboffersapp.exception.UserException;
import pl.joboffers.joboffersapp.repository.JobOfferRepository;
import pl.joboffers.joboffersapp.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class JobOfferService {

    private final UserRepository userRepository;
    private final JobOfferRepository jobOfferRepository;

    public JobOfferService(UserRepository userRepository, JobOfferRepository jobOfferRepository) {
        this.userRepository = userRepository;
        this.jobOfferRepository = jobOfferRepository;
    }

    public List<JobOfferDTO> getAll() {
        List<JobOffer> all = jobOfferRepository.findAll(Sort.by("isActive").descending().and(Sort.by("created").descending()));
        return getJobOfferDTOS(all);
    }

    public List<JobOfferDTO> getAllByUser(String username) throws UserException {
        List<JobOffer> all = jobOfferRepository.findByUser(userRepository.findByEmail(username).orElseThrow(() -> new UserException(ExceptionConstant.USER_NOT_FOUND)), Sort.by("isActive").descending().and(Sort.by("created").descending()));
        return getJobOfferDTOS(all);
    }

    public JobOfferDTO getById(Long id) throws JobOfferException {
        JobOffer jobOffer = jobOfferRepository.findById(id).orElseThrow(() -> new JobOfferException(ExceptionConstant.JOB_OFFER_NOT_FOUND));
        return getJobOfferDTO(jobOffer);
    }

    public void add(JobOfferAddDTO dto, String username) throws UserException, JobOfferException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserException(ExceptionConstant.USER_NOT_FOUND));
        Role role = user.getRole();
        if (role != Role.RECRUITER) {
            throw new JobOfferException(ExceptionConstant.NO_AUTHORITY);
        }
        if (dto.getWagesFrom() > dto.getWagesTo()) {
            throw new JobOfferException(ExceptionConstant.BAD_WAGES);
        }
        JobOffer jobOffer = new JobOffer(dto.getTitle(), dto.getCompany(), dto.getAddress(), dto.getWagesFrom(), dto.getWagesTo(), dto.getDescription(), LocalDateTime.now(), true, user);
        jobOfferRepository.save(jobOffer);
    }

    public void edit(JobOfferEditDTO dto, String username) throws JobOfferException, UserException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserException(ExceptionConstant.USER_NOT_FOUND));
        Role role = user.getRole();
        if (role != Role.RECRUITER) {
            throw new JobOfferException(ExceptionConstant.NO_AUTHORITY);
        }
        JobOffer jobOffer = jobOfferRepository.findById(dto.getId()).orElseThrow(() -> new JobOfferException(ExceptionConstant.JOB_OFFER_NOT_FOUND));
        jobOffer.setTitle(dto.getTitle());
        jobOffer.setCompany(dto.getCompany());
        jobOffer.setAddress(dto.getAddress());
        jobOffer.setWagesFrom(dto.getWagesFrom());
        jobOffer.setWagesTo(dto.getWagesTo());
        jobOffer.setDescription(dto.getDescription());
        jobOfferRepository.save(jobOffer);
    }

    public void deactive(Long id, String username) throws JobOfferException, UserException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserException(ExceptionConstant.USER_NOT_FOUND));
        Role role = user.getRole();
        if (role != Role.RECRUITER) {
            throw new JobOfferException(ExceptionConstant.NO_AUTHORITY);
        }
        JobOffer jobOffer = jobOfferRepository.findById(id).orElseThrow(() -> new JobOfferException(ExceptionConstant.JOB_OFFER_NOT_FOUND));
        jobOffer.setActive(false);
        jobOfferRepository.save(jobOffer);
    }

    public List<JobOfferDTO> getJobOfferDTOS(List<JobOffer> all) {
        List<JobOfferDTO> dtos = new ArrayList<>();

        for (JobOffer jo : all) {
            JobOfferDTO jobOfferDTO = getJobOfferDTO(jo);
            dtos.add(jobOfferDTO);
        }

        return dtos;
    }

    public JobOfferDTO getJobOfferDTO(JobOffer jo) {
        User user = jo.getUser();
        UserDTO userDTO = new UserDTO(user.getUsername(), user.getFirstName(), user.getLastName(), user.getRole().getRoleName());
        JobOfferDTO jobOfferDTO = new JobOfferDTO();
        jobOfferDTO.setId(jo.getId());
        jobOfferDTO.setTitle(jo.getTitle());
        jobOfferDTO.setCompany(jo.getCompany());
        jobOfferDTO.setAddress(jo.getAddress());
        jobOfferDTO.setWagesFrom(jo.getWagesFrom());
        jobOfferDTO.setWagesTo(jo.getWagesTo());
        jobOfferDTO.setDescription(jo.getDescription());
        jobOfferDTO.setCreated(jo.getCreated());
        jobOfferDTO.setActive(jo.isActive());
        jobOfferDTO.setUser(userDTO);
        return jobOfferDTO;
    }
}
