package pl.joboffers.joboffersapp.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.joboffers.joboffersapp.dto.JobOfferAddDTO;
import pl.joboffers.joboffersapp.dto.JobOfferDTO;
import pl.joboffers.joboffersapp.dto.JobOfferEditDTO;
import pl.joboffers.joboffersapp.exception.JobOfferException;
import pl.joboffers.joboffersapp.exception.UserException;
import pl.joboffers.joboffersapp.service.JobOfferService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/job-offers")
public class JobOfferController {

    private final JobOfferService jobOfferService;

    public JobOfferController(JobOfferService jobOfferService) {
        this.jobOfferService = jobOfferService;
    }

    @GetMapping()
    public ResponseEntity<List<JobOfferDTO>> getAll() {
        return ResponseEntity.ok(jobOfferService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobOfferDTO> getById(@PathVariable Long id) throws JobOfferException, UserException {
        return ResponseEntity.ok(jobOfferService.getById(id));
    }

    @GetMapping("/user")
    public ResponseEntity<List<JobOfferDTO>> getAllByUser(Principal principal) throws UserException {
        return ResponseEntity.ok(jobOfferService.getAllByUser(principal.getName()));
    }

    @PostMapping()
    public ResponseEntity<Void> add(@RequestBody @Valid JobOfferAddDTO request, Principal principal) throws UserException, JobOfferException {
        jobOfferService.add(request, principal.getName());
        return ResponseEntity.ok().build();
    }

    @PutMapping()
    public ResponseEntity<Void> edit(@RequestBody @Valid JobOfferEditDTO request, Principal principal) throws UserException, JobOfferException {
        jobOfferService.edit(request, principal.getName());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> deactive(@PathVariable Long id, Principal principal) throws JobOfferException, UserException {
        jobOfferService.deactive(id, principal.getName());
        return ResponseEntity.ok().build();
    }


}
