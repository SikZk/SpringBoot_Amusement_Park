package org.website.adminpanel.worker;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.Date;


@Data
@Builder
@Entity
@Table(name = "WORKERS")
@NoArgsConstructor
@AllArgsConstructor
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

    @Column(name = "EMAIL", length = 30)
    private String email;

    @Column(name = "PASSWORD", length = 60)
    private String password;

    @Column(name = "BANK_ACCOUNT_NUMBER", length = 28)
    private String bankAccountNumber;

    @Column(name = "PHONE_NUMBER", length = 12)
    private String phoneNumber;

    @Column(name = "SALARY", precision = 10, scale = 2)
    private BigDecimal salary;

    @Column(name = "PARK_ID")
    private Long parkId;

    @Column(name = "ADDRESS_ID")
    private Long addressId;
}
