package org.website.apigateway.models.client;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.website.apigateway.models.worker.WorkerRole;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Builder
@Entity
@Table(name = "CLIENTS")
@NoArgsConstructor
@AllArgsConstructor
public class Client implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_CLIENTS")
    @SequenceGenerator(name = "SEQ_CLIENTS", sequenceName = "SEQ_CLIENTS", allocationSize = 1)
    @Column(name = "CLIENT_ID", nullable = false)
    private Integer clientId;

    @Column(name = "SEX", nullable = false)
    private Character sex;

    @Column(name = "PHONE_NUMBER", length = 12)
    private String phoneNumber;

    @Column(name = "NAME", nullable = false, length = 20)
    private String name;

    @Column(name = "SURNAME", nullable = false, length = 30)
    private String surname;

    @Column(name = "LINK", length = 100)
    private String link;

    @Column(name = "ACCOUNT_CREATION_DATE", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date accountCreationDate;

    @Column(name = "EMAIL", length = 30)
    private String email;

    @Column(name = "PASSWORD", nullable = false, length = 60)
    private String password;

    @Column(name = "ROLE")
    @Enumerated(EnumType.STRING)
    private ClientRole role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {return true;}

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {return true;}
}
