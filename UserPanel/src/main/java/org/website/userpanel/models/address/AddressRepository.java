package org.website.userpanel.models.address;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.userpanel.models.address.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {
}
