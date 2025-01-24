package org.website.userpanel.models.food_point;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.userpanel.models.food_point.FoodPoint;

public interface FoodPointRepository extends JpaRepository<FoodPoint, Integer> {
}
