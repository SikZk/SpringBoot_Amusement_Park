package org.website.adminpanel.controllers;

import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(workerService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(workerService.login(request));
    }

}
