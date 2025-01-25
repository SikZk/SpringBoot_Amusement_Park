package org.website.userpanel.models.amusement_park;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.userpanel.models.amusement_park.AmusementPark;

import java.util.Optional;

public interface AmusementParkRepository extends JpaRepository<AmusementPark, Integer> {
    Optional<AmusementPark> findByParkId(Integer parkId);
}
