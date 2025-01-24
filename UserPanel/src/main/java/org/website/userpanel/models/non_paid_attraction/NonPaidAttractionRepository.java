package org.website.userpanel.models.non_paid_attraction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.userpanel.models.non_paid_attraction.NonPaidAttraction;

public interface NonPaidAttractionRepository extends JpaRepository<NonPaidAttraction, Integer> {
}
