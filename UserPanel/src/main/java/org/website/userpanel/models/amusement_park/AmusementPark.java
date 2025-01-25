package org.website.userpanel.models.amusement_park;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.website.userpanel.models.address.Address;
import org.website.userpanel.models.owner.Owner;

@Data
@Builder
@Entity
@Table(name = "AMUSEMENT_PARKS")
@NoArgsConstructor
@AllArgsConstructor
public class AmusementPark {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_AMUSEMENT_PARKS")
    @SequenceGenerator(name = "SEQ_AMUSEMENT_PARKS", sequenceName = "SEQ_AMUSEMENT_PARKS", allocationSize = 1)
    @Column(name = "PARK_ID", nullable = false)
    private Integer parkId;

    @Column(name = "NAME", nullable = false, length = 30)
    private String name;

    @ManyToOne
    @JsonBackReference
    private Owner owner;

    @ManyToOne
    @JsonBackReference
    private Address address;
}
