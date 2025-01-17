package org.website.adminpanel.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.website.adminpanel.models.client.Client;
import org.website.adminpanel.models.client.ClientService;

import java.util.List;

@RestController
@RequestMapping("/client")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;


    @GetMapping("/getAll")
    public ResponseEntity<List<Client> > getAll() {

        List<Client> allClients = clientService.getAllClients();
        return ResponseEntity.ok().body(allClients);
    }

}
