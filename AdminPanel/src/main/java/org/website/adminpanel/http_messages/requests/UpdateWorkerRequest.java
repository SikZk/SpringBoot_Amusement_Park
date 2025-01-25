package org.website.adminpanel.http_messages.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateWorkerRequest {
    private String bankAccountNumber;
    private String dateOfBirth;
    private String email;
    private String idNumber;
    private String name;
    private String pesel;
    private String sex;
    private String surname;
}
