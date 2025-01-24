package org.website.userpanel.models.attraction;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.website.userpanel.models.amusement_park.AmusementPark;

@Data
@SuperBuilder
@Entity
@Table(name = "ATTRACTIONS")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorColumn(name = "ATTRACTION_TYPE", discriminatorType = DiscriminatorType.STRING)
public class Attraction {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_ATTRACTIONS")
    @SequenceGenerator(name = "SEQ_ATTRACTIONS", sequenceName = "SEQ_ATTRACTIONS", allocationSize = 1)
    @Column(name = "ATTRACTION_ID", nullable = false)
    private Integer attractionId;

    @Column(name = "NAME", nullable = false, length = 30)
    private String name;

    @Column(name = "LEVEL_OF_EXTREME", nullable = false)
    private Character levelOfExtreme;

    @Column(name = "IS_PAID", nullable = false)
    private Character isPaid;

    @Column(name = "SPOTS_AMOUNT")
    private Integer spotsAmount;

    @Column(name = "MAX_WORKPLACES_AMOUNT")
    private Integer maxWorkplacesAmount;

    @ManyToOne
    @JoinColumn(name = "PARK_ID")
    private AmusementPark park;
}
