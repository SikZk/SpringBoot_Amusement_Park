package org.website.adminpanel.models.food_point;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.adminpanel.models.address.Address;

public interface FoodPointRepository extends JpaRepository<FoodPoint, Integer> {
}
