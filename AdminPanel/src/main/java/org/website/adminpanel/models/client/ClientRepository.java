package org.website.adminpanel.models.client;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.adminpanel.models.address.Address;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Integer> {


}
