package org.website.userpanel.controllers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.website.userpanel.config.security.JwtService;
import org.website.userpanel.http_messages.requests.UpdateClientRequest;
import org.website.userpanel.http_messages.requests.UpdatePasswordRequest;
import org.website.userpanel.models.client.Client;
import org.website.userpanel.models.client.ClientService;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {
    private final JwtService jwtService;
    private final ClientService clientService;

    @GetMapping("/getMyLink")
    public ResponseEntity<String> getMyLink(HttpServletRequest request) {
        String jwt = jwtService.getJwtFromRequest(request);
        String link;
        if (jwt == null) {
            return ResponseEntity.badRequest().build();
        }
        try{
            link = clientService.getUserLink(jwtService.extractUsername(jwt));
        } catch (Exception e) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(link);
    }
    @GetMapping("/getMyAccountData")
    public ResponseEntity<Client> getMyAccountData(HttpServletRequest request) {
        String jwt = jwtService.getJwtFromRequest(request);
        Client client;
        if (jwt == null) {
            return ResponseEntity.badRequest().build();
        }
        try{
            client = clientService.getClientByUsername(jwtService.extractUsername(jwt));
        } catch (Exception e) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(client);
    }
    @PostMapping("/updateMyPassword")
    public ResponseEntity<String> updateMyPassword(
            HttpServletRequest request, @RequestBody UpdatePasswordRequest updatePasswordRequest){
        String jwt = jwtService.getJwtFromRequest(request);
        if (jwt == null) {
            return ResponseEntity.badRequest().build();
        }
        try{
            clientService.updatePassword(jwtService.extractUsername(jwt), updatePasswordRequest.getOldPassword(), updatePasswordRequest.getNewPassword());
        } catch (Exception e) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok("Password updated");
    }

    @PostMapping("/updateMyData")
    public ResponseEntity<String> updateMyData(HttpServletRequest request, @RequestBody UpdateClientRequest updateClientRequest) {
        String jwt = jwtService.getJwtFromRequest(request);
        if (jwt == null) {
            return ResponseEntity.badRequest().build();
        }
        try{
            clientService.updateData(jwtService.extractUsername(jwt), updateClientRequest.getFirstName(), updateClientRequest.getLastName());
        } catch (Exception e) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok("Data updated");
    }
    @PostMapping("/buyTicket")
    public ResponseEntity<String> buyTicket(HttpServletRequest request, @RequestBody String ticketLevel){
        String jwt = jwtService.getJwtFromRequest(request);
        if (jwt == null) {
            return ResponseEntity.badRequest().build();
        }
        try{
            clientService.buyTicket(jwtService.extractUsername(jwt), ticketLevel);
        } catch (Exception e) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok("Ticket bought");
    }
}
