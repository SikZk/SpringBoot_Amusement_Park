package org.website.adminpanel.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.website.adminpanel.http_messages.requests.CreateClientRequest;
import org.website.adminpanel.http_messages.requests.UpdateClientRequest;
import org.website.adminpanel.http_messages.requests.UpdateWorkerRequest;
import org.website.adminpanel.models.client.Client;
import org.website.adminpanel.models.client.ClientService;
import org.website.adminpanel.models.worker.Worker;

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

    @PostMapping("update/{id}")
    public ResponseEntity<Client> updateWorker(
            @PathVariable("id") String id,
            @RequestBody UpdateClientRequest updateCLientRequest
    ){
        Client updatedClient;
        try{
            System.out.println("id: " + id);
            updatedClient = clientService.updateClient(id, updateCLientRequest);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok().body(updatedClient);
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<String> deleteClient(
            @PathVariable("id") String id
    ){
        try{
            clientService.deleteClient(id);
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Error");
        }
        return ResponseEntity.ok().body("Deleted");
    }
    @PostMapping("/create")
    public ResponseEntity<Client> createClient(
            @RequestBody CreateClientRequest updateClientRequest
    ){
        Client createdClient;
        try{
            createdClient = clientService.createClient(updateClientRequest);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok().body(createdClient);
    }
}
