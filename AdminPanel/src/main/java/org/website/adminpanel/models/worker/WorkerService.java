package org.website.adminpanel.models.worker;

import org.springframework.http.ResponseCookie;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.website.adminpanel.config.security.JwtService;
import org.website.adminpanel.http_messages.requests.AuthenticationRequest;
import org.website.adminpanel.http_messages.requests.RegisterRequest;
import org.website.adminpanel.http_messages.responses.AuthenticationResponse;
import org.website.adminpanel.models.address.Address;
import org.website.adminpanel.models.address.AddressRepository;
import org.website.adminpanel.models.amusement_park.AmusementParkRepository;
import org.website.adminpanel.models.client.Client;
import org.website.adminpanel.models.owner.OwnerRepository;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkerService {
    private final WorkerRepository workerRepository;
    private final AmusementParkRepository amusementParkRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final OwnerRepository ownerRepository;

    public AuthenticationResponse register(RegisterRequest request) {
        try {
            Date dateOfBirth = parseStringToDate(request.getDateOfBirth());
            Date employmentDate = parseStringToDate(request.getEmploymentDate());
            if(dateOfBirth == null || employmentDate == null) {
                throw new IllegalArgumentException("Invalid date format");
            }
            Address address = Address.builder()
                    .city(request.getCity())
                    .street(request.getStreet())
                    .postalCode(request.getPostalCode())
                    .streetNumber(request.getStreetNumber())
                    .build();
            Address savedAddress = addressRepository.save(address);

            Worker worker = Worker.builder()
                    .name(request.getName())
                    .surname(request.getSurname())
                    .dateOfBirth(dateOfBirth)
                    .pesel(request.getPesel())
                    .sex(request.getSex())
                    .idNumber(request.getIdNumber())
                    .employmentDate(employmentDate)
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .bankAccountNumber(request.getBankAccountNumber())
                    .salary(new BigDecimal(request.getSalary()))
                    .park(amusementParkRepository.findByParkId(Integer.parseInt(request.getParkId()))
                            .orElseThrow(()-> new IllegalArgumentException("Park not found")))
                    .address(savedAddress)
                    .role(WorkerRole.ADMIN)
                    .build();
            if(workerRepository.findWorkerByEmail(request.getEmail()).isPresent()) {
                return AuthenticationResponse.builder()
                        .additionalInfo("User with this email already exists")
                        .cookie(null)
                        .token("")
                        .build();
            }
            workerRepository.save(worker);
            String token = jwtService.generateToken(worker);

            return AuthenticationResponse.builder()
                    .additionalInfo("User registered successfully")
                    .cookie(createCookie(token))
                    .token(token)
                    .build();
        } catch (IllegalArgumentException e) {
            return AuthenticationResponse.builder()
                    .additionalInfo("Invalid data format")
                    .cookie(null)
                    .token("")
                    .build();
        }
    }

    public AuthenticationResponse login(AuthenticationRequest request) {

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            Worker worker = workerRepository.findWorkerByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("Worker not found"));
            String token = jwtService.generateToken(worker);

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

    public List<Worker> getAllWorkers() {
        List<Worker> allWorkers = workerRepository.findAll();
        return allWorkers;
    }
}
