package org.website.userpanel.http_messages.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String email;
    private String name;
    private String password;
    private String phoneNumber;
    private String sex;
    private String surname;
    private String parkId;
}
