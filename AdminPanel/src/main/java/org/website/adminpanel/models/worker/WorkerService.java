package org.website.adminpanel.models.worker;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.website.adminpanel.http_messages.requests.AuthenticationRequest;
import org.website.adminpanel.http_messages.requests.RegisterRequest;
import org.website.adminpanel.http_messages.responses.AuthenticationResponse;

@Service
@RequiredArgsConstructor
public class WorkerService {
    private final WorkerRepository workerRepository;

    public AuthenticationResponse register(RegisterRequest request) {
        return null;
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        return AuthenticationResponse.builder()
                .additionalInfo("Logged in")
                .token("token")
                .build();
    }
}
