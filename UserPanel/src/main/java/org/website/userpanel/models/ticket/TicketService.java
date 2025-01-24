package org.website.userpanel.models.ticket;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.website.userpanel.models.client.Client;
import org.website.userpanel.models.client.ClientRepository;
import org.website.userpanel.models.ticket.Ticket;
import org.website.userpanel.models.ticket.TicketRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;
    private final ClientRepository clientRepository;


    public List<Ticket> getAllUserTickets(String username) {
        Client client = clientRepository.findClientByEmail(username)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        return ticketRepository.findAllByClient(client)
                .orElseThrow(() -> new RuntimeException("No tickets found"));
    }
}
