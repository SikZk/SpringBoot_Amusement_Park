package org.website.userpanel.models.worker;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.website.userpanel.models.address.Address;
import org.website.userpanel.models.amusement_park.AmusementPark;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;
import java.util.List;


@Data
@SuperBuilder
@Entity
@Table(name = "WORKERS")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorColumn(name = "WORKER_TYPE", discriminatorType = DiscriminatorType.STRING)
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_WORKERS")
    @SequenceGenerator(name = "SEQ_WORKERS", sequenceName = "SEQ_WORKERS", allocationSize = 1)
    @Column(name = "WORKER_ID")
    private Integer id;

    @Column(name = "NAME", nullable = false, length = 20)
    private String name;

    @Column(name = "SURNAME", nullable = false, length = 30)
    private String surname;

    @Column(name = "DATE_OF_BIRTH")
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    @Column(name = "PESEL", length = 11)
    private String pesel;

    @Column(name = "SEX", length = 1)
    private String sex;

    @Column(name = "ID_NUMBER", length = 9)
    private String idNumber;

    @Column(name = "EMPLOYMENT_DATE")
    @Temporal(TemporalType.DATE)
    private Date employmentDate;

    @Column(name = "EMAIL", length = 30, unique = true, nullable = false)
    private String email;

    @Column(name = "PASSWORD", length = 60, unique = true, nullable = false)
    private String password;

    @Column(name = "BANK_ACCOUNT_NUMBER", length = 28)
    private String bankAccountNumber;

    @Column(name = "PHONE_NUMBER", length = 12)
    private String phoneNumber;

    @Column(name = "SALARY", precision = 10, scale = 2)
    private BigDecimal salary;

    @ManyToOne
    @JoinColumn(name = "PARK_ID")
    private AmusementPark park;

    @ManyToOne
    @JoinColumn(name = "ADDRESS_ID")
    private Address address;

    @Column(name = "ROLE")
    @Enumerated(EnumType.STRING)
    private WorkerRole role;

}
