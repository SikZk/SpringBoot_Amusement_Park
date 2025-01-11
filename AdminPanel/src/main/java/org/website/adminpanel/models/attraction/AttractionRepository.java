package org.website.adminpanel.models.attraction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.adminpanel.models.address.Address;

public interface AttractionRepository extends JpaRepository<Attraction, Integer> {
}
