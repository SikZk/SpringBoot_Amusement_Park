package org.website.apigateway.models.worker;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;
import java.util.List;


@Data
@SuperBuilder
@Entity
@Table(name = "WORKERS")
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
@AllArgsConstructor
public class Worker implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_WORKERS")
    @SequenceGenerator(name = "SEQ_WORKERS", sequenceName = "SEQ_WORKERS", allocationSize = 1)
    @Column(name = "WORKER_ID")
    private Integer id;

    @Column(name = "NAME", nullable = false, length = 20)
    private String name;

    @Column(name = "SURNAME", nullable = false, length = 30)
    private String surname;

    @Column(name = "EMAIL", length = 30)
    private String email;

    @Column(name = "PASSWORD", length = 60)
    private String password;

    @Column(name = "ROLE")
    @Enumerated(EnumType.STRING)
    private WorkerRole role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
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
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
