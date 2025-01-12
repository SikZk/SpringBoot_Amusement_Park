package org.website.adminpanel.http_messages.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String name;
    private String surname;
    private String dateOfBirth;
    private String sex;
    private String employmentDate;
    private String email;
    private String password;
    private String pesel;
    private String bankAccountNumber;
    private String idNumber;
    private String phoneNumber;
    private String salary;
    private String parkId;
    private String city;
    private String street;
    private String postalCode;
    private String streetNumber;
    private String workerType;
    private String bookletExpirationDate;
    private String specialization;
    private String fearOfHeights;
    private String isTrainingCompleted;
}
