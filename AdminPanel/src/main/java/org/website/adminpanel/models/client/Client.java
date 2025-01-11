package org.website.adminpanel.models.client;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.website.adminpanel.models.amusement_park.AmusementPark;

import java.util.Date;

@Data
@Builder
@Entity
@Table(name = "CLIENTS")
@NoArgsConstructor
@AllArgsConstructor
public class Client {
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

    @ManyToOne
    @JoinColumn(name = "PARK_ID")
    private AmusementPark park;
}
