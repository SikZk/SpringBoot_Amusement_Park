package org.website.adminpanel.models.amusement_park;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.adminpanel.models.address.Address;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface AmusementParkRepository extends JpaRepository<AmusementPark, Integer> {
    Optional<AmusementPark> findByParkId(Integer parkId);
}
