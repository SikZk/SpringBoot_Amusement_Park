package org.website.userpanel.models.client;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.userpanel.models.ticket.Ticket;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {

    Optional<Client> findClientByEmail(String email);
}
