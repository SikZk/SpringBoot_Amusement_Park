package org.website.adminpanel.models.food_staff;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.adminpanel.models.address.Address;

public interface FoodStaffRepository extends JpaRepository<FoodStaff, Integer> {
}
