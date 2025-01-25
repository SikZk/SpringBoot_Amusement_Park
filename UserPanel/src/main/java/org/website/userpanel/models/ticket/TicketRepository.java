package org.website.userpanel.models.ticket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.website.userpanel.models.client.Client;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    Optional<List<Ticket>> findAllByClient(Client client);
}
