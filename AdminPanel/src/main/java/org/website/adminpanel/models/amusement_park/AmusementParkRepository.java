package org.website.adminpanel.models.amusement_park;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.adminpanel.models.address.Address;

public interface AmusementParkRepository extends JpaRepository<AmusementPark, Integer> {
}
