package org.website.userpanel.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.website.userpanel.http_messages.requests.AuthenticationRequest;
import org.website.userpanel.http_messages.requests.RegisterRequest;
import org.website.userpanel.http_messages.responses.AuthenticationResponse;
import org.website.userpanel.models.client.ClientService;

@RestController
@RequestMapping("/authentication")
@RequiredArgsConstructor
public class AuthenticationController {
    private final ClientService clientService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request
    ) {
        AuthenticationResponse response = clientService.register(request);
        if(response.getToken().isEmpty()){
            return ResponseEntity.badRequest().body(response.getAdditionalInfo());
        }
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE,response.getCookie().toString())
                .body(response.getAdditionalInfo());
    }

    @PostMapping("/login")
    public ResponseEntity<String> register(
            @RequestBody AuthenticationRequest request
    ) {
        AuthenticationResponse response = clientService.login(request);
        if(response.getToken().isEmpty()){
            return ResponseEntity.badRequest().body(response.getAdditionalInfo());
        }
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE,response.getCookie().toString())
                .body(response.getAdditionalInfo());
    }
    @GetMapping("/authorize")
    public ResponseEntity<Boolean> authorize(){
        return ResponseEntity.ok(true);
    }

}
