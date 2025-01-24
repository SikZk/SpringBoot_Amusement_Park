package org.website.adminpanel.models.client;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.website.adminpanel.http_messages.requests.CreateClientRequest;
import org.website.adminpanel.http_messages.requests.UpdateClientRequest;
import org.website.adminpanel.models.amusement_park.AmusementParkRepository;
import org.website.adminpanel.models.ticket.Ticket;
import org.website.adminpanel.models.ticket.TicketRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;
    private final TicketRepository ticketRepository;
    private final AmusementParkRepository amusementParkRepository;
    private final PasswordEncoder passwordEncoder;

    public List<Client> getAllClients() {
        List<Client> allClients = clientRepository.findAll();
        return allClients;
    }

    public Client updateClient(String id, UpdateClientRequest updateCLientRequest) {
        Client client = clientRepository.findById(Integer.parseInt(id))
                .orElseThrow(() -> new IllegalArgumentException("Client not found"));
        client.setName(updateCLientRequest.getName());
        client.setSurname(updateCLientRequest.getSurname());
        client.setPhoneNumber(updateCLientRequest.getPhoneNumber());
        client.setEmail(updateCLientRequest.getEmail());
        client.setSex(updateCLientRequest.getSex().toCharArray()[0]);
        client.setAccountCreationDate(parseStringToDate(updateCLientRequest.getAccountCreationDate()));

        clientRepository.saveAndFlush(client);
        return client;
    }

    private Date parseStringToDate(String date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return formatter.parse(date);
        } catch (Exception e) {
            try {
                formatter = new SimpleDateFormat("yyyy/MM/dd");
                return formatter.parse(date);
            } catch (Exception e2) {
                return null;
            }
        }
    }

    public void deleteClient(String id) {
        Client client = clientRepository.findById(Integer.parseInt(id))
                .orElseThrow(() -> new IllegalArgumentException("Client not found"));
        List<Ticket> tickets =  ticketRepository.findAllByClient(client)
                .orElseThrow(() -> new IllegalArgumentException("Tickets not found"));
        for (Ticket ticket : tickets) {
            ticketRepository.deleteById(ticket.getTicketId());
        }
        clientRepository.deleteById(Integer.parseInt(id));
    }

    public Client createClient(CreateClientRequest createClientRequest) {
        Client client = Client.builder()
                .name(createClientRequest.getName())
                .surname(createClientRequest.getSurname())
                .phoneNumber(createClientRequest.getPhoneNumber())
                .email(createClientRequest.getEmail())
                .sex(createClientRequest.getSex().toCharArray()[0])
                .password(passwordEncoder.encode(createClientRequest.getPassword()))
                .park(amusementParkRepository.findByParkId(Integer.parseInt("2"))
                        .orElseThrow(()-> new IllegalArgumentException("Park not found")))
                .accountCreationDate(new Date())
                .role(ClientRole.USER)
                .link(UUID.randomUUID().toString())
                .build();
        clientRepository.saveAndFlush(client);
        return client;
    }
}
