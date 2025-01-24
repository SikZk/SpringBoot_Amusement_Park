package org.website.userpanel.models.address;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@Table(name = "ADDRESSES")
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_ADDRESSES")
    @SequenceGenerator(name = "SEQ_ADDRESSES", sequenceName = "SEQ_ADDRESSES", allocationSize = 1)
    @Column(name = "ADDRESS_ID", nullable = false)
    private Integer addressId;

    @Column(name = "POSTAL_CODE", nullable = false, length = 6)
    private String postalCode;

    @Column(name = "CITY", nullable = false, length = 20)
    private String city;

    @Column(name = "STREET", nullable = false, length = 20)
    private String street;

    @Column(name = "STREET_NUMBER", length = 10)
    private String streetNumber;
}
