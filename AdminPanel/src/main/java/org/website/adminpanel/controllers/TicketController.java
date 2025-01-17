package org.website.adminpanel.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.website.adminpanel.models.attraction.Attraction;
import org.website.adminpanel.models.ticket.Ticket;
import org.website.adminpanel.models.ticket.TicketService;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Ticket>> getAll() {

        List<Ticket> allTickets = ticketService.getAllTickets();
        return ResponseEntity.ok().body(allTickets);
    }

}
