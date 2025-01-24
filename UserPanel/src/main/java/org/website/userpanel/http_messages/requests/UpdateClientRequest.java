package org.website.userpanel.http_messages.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateClientRequest {
    private String firstName;
    private String lastName;
}
