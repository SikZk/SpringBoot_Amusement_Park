package org.website.adminpanel.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.website.adminpanel.http_messages.requests.AuthenticationRequest;
import org.website.adminpanel.http_messages.requests.RegisterRequest;
import org.website.adminpanel.http_messages.responses.AuthenticationResponse;
import org.website.adminpanel.models.worker.WorkerService;


@RestController
@RequestMapping("/authentication")
@RequiredArgsConstructor
public class AuthenticationController {
    private final WorkerService workerService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request
    ) {
        AuthenticationResponse response = workerService.register(request);
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
        AuthenticationResponse response = workerService.login(request);
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
