package org.website.userpanel.models.paid_attraction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.userpanel.models.paid_attraction.PaidAttraction;

public interface PaidAttractionRepository extends JpaRepository<PaidAttraction, Integer> {
}
