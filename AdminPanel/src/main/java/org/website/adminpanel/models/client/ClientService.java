package org.website.adminpanel.models.client;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;

    public List<Client> getAllClients() {
        List<Client> allClients = clientRepository.findAll();
        return allClients;
    }
}
