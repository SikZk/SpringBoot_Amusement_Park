package org.website.userpanel.models.client;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.website.userpanel.config.security.JwtService;
import org.website.userpanel.http_messages.requests.AuthenticationRequest;
import org.website.userpanel.http_messages.requests.RegisterRequest;
import org.website.userpanel.http_messages.responses.AuthenticationResponse;
import org.website.userpanel.models.amusement_park.AmusementParkRepository;
import org.website.userpanel.models.attraction.Attraction;
import org.website.userpanel.models.attraction.AttractionRepository;
import org.website.userpanel.models.client.Client;
import org.website.userpanel.models.client.ClientRepository;
import org.website.userpanel.models.ticket.Ticket;
import org.website.userpanel.models.ticket.TicketRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AmusementParkRepository amusementParkRepository;
    private final AttractionRepository attractionRepository;
    private final TicketRepository ticketRepository;


    public AuthenticationResponse register(RegisterRequest request) {
        Client client = Client.builder()
                .name(request.getName())
                .surname(request.getSurname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .sex(request.getSex().toCharArray()[0])
                .phoneNumber(request.getPhoneNumber())
                .park(amusementParkRepository.findByParkId(Integer.parseInt(request.getParkId()))
                        .orElseThrow(()-> new IllegalArgumentException("Park not found")))
                .accountCreationDate(new Date())
                .role(ClientRole.USER)
                .link(UUID.randomUUID().toString())
                .build();
        return null;
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            Client client = clientRepository.findClientByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("Client not found"));
            String token = jwtService.generateToken(client);

            return AuthenticationResponse.builder()
                    .additionalInfo("Logged in")
                    .cookie(createCookie(token))
                    .token(token)
                    .build();
        } catch (UsernameNotFoundException e) {
            return AuthenticationResponse.builder()
                    .additionalInfo("User not found")
                    .cookie(null)
                    .token("")
                    .build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return AuthenticationResponse.builder()
                    .additionalInfo("Invalid credentials")
                    .cookie(null)
                    .token("")
                    .build();
        }
    }
    private ResponseCookie createCookie(String token) {
        return ResponseCookie.from("Bearer")
                .value(token)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .domain("localhost")
                .maxAge(10800)
                .path("/")
                .build();
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

    public String getUserLink(String username) {
        return clientRepository.findClientByEmail(username)
                .orElseThrow(() -> new RuntimeException("Client not found"))
                .getLink();
    }

    public Client getClientByUsername(String s) {
        return clientRepository.findClientByEmail(s)
                .orElseThrow(() -> new RuntimeException("Client not found"));
    }

    public void updatePassword(String s, String oldPassword, String newPassword) {
        Client client = clientRepository.findClientByEmail(s)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        if (passwordEncoder.matches(oldPassword, client.getPassword())) {
            client.setPassword(passwordEncoder.encode(newPassword));
            clientRepository.save(client);
        } else {
            throw new IllegalArgumentException("Wrong password");
        }
    }

    public void updateData(String s, String name, String surname) {
        Client client = clientRepository.findClientByEmail(s)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        client.setName(name);
        client.setSurname(surname);
        clientRepository.save(client);
    }

    public void buyTicket(String s, String ticketLevel) {
        Client client = clientRepository.findClientByEmail(s)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        Attraction attraction = attractionRepository.findById(100).orElseThrow(() -> new RuntimeException("Attraction not found"));
        Ticket ticket = Ticket.builder()
                .client(client)
                .ticketDate(new Date())
                .type("NORMAL")
                .attractionId(attraction)
                .build();
        ticketRepository.saveAndFlush(ticket);
    }
}
