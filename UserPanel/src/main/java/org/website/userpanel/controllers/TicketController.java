package org.website.userpanel.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.website.userpanel.config.security.JwtService;
import org.website.userpanel.models.ticket.Ticket;
import org.website.userpanel.models.ticket.TicketService;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;
    private final JwtService jwtService;

    @GetMapping("/getMyTickets")
    public ResponseEntity<List<Ticket>> getMyTickets(HttpServletRequest request) {
        String jwt = jwtService.getJwtFromRequest(request);
        List<Ticket> tickets;
        if (jwt == null) {
            return ResponseEntity.badRequest().build();
        }
        try{
            tickets = ticketService.getAllUserTickets(jwtService.extractUsername(jwt));
        } catch (Exception e) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(tickets);
    }

}
