package org.website.userpanel.models.food_point;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.website.userpanel.models.amusement_park.AmusementPark;

@Data
@Builder
@Entity
@Table(name = "FOOD_POINTS")
@NoArgsConstructor
@AllArgsConstructor
public class FoodPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_FOOD_POINTS")
    @SequenceGenerator(name = "SEQ_FOOD_POINTS", sequenceName = "SEQ_FOOD_POINTS", allocationSize = 1)
    @Column(name = "FOOD_POINT_ID", nullable = false)
    private Integer foodPointId;

    @Column(name = "NAME", nullable = false, length = 30)
    private String name;

    @Column(name = "SPECIALIZATION", length = 30)
    private String specialization;

    @Column(name = "FOOD_AMOUNT")
    private Integer foodAmount;

    @Column(name = "MAX_WORKPLACES_AMOUNT")
    private Integer maxWorkplacesAmount;

    @ManyToOne
    @JoinColumn(name = "PARK_ID", nullable = false)
    private AmusementPark park;
}
