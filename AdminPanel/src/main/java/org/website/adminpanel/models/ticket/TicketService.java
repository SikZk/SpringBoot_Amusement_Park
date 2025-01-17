package org.website.adminpanel.models.ticket;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;

    public List<Ticket> getAllTickets() {
        List<Ticket> allTickets = ticketRepository.findAll();
        return allTickets;
    }

}
