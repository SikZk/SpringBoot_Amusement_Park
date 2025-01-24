package org.website.adminpanel.models.ticket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.adminpanel.models.client.Client;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    Optional<List<Ticket>> findAllByClient(Client client);
}
