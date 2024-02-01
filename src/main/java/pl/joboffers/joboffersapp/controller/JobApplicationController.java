package pl.joboffers.joboffersapp.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.joboffers.joboffersapp.dto.JobApplicationAddDTO;
import pl.joboffers.joboffersapp.dto.JobApplicationDTO;
import pl.joboffers.joboffersapp.dto.JobApplicationSetDateDTO;
import pl.joboffers.joboffersapp.exception.JobApplicationException;
import pl.joboffers.joboffersapp.exception.JobOfferException;
import pl.joboffers.joboffersapp.exception.UserException;
import pl.joboffers.joboffersapp.service.JobApplicationService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/job-applications")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    @GetMapping("/worker")
    public ResponseEntity<List<JobApplicationDTO>> getUserApplication(Principal principal) throws UserException {
        return ResponseEntity.ok(jobApplicationService.getUserApplication(principal.getName()));
    }

    @GetMapping("/offer/{id}")
    public ResponseEntity<List<JobApplicationDTO>> getApplicationByOffer(@PathVariable Long id, Principal principal) throws JobApplicationException, JobOfferException, UserException {
        return ResponseEntity.ok(jobApplicationService.getApplicationById(id, principal.getName()));
    }

    @PostMapping()
    public ResponseEntity<Void> add(@RequestBody @Valid JobApplicationAddDTO request, Principal principal) throws UserException, JobOfferException, JobApplicationException {
        jobApplicationService.add(request, principal.getName());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> end(@PathVariable Long id, Principal principal) throws JobApplicationException, JobOfferException, UserException {
        jobApplicationService.end(id, principal.getName());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/datetime")
    public ResponseEntity<Void> setInterviewDateTime(@RequestBody JobApplicationSetDateDTO request, Principal principal) throws JobApplicationException, JobOfferException, UserException {
        jobApplicationService.setInterviewDateTime(request, principal.getName());
        return ResponseEntity.ok().build();
    }


}
