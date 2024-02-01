package pl.joboffers.joboffersapp.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.joboffers.joboffersapp.entity.JobOffer;
import pl.joboffers.joboffersapp.entity.User;

import java.util.List;

@Repository
public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {

    List<JobOffer> findByUser(User user, Sort sort);

}
