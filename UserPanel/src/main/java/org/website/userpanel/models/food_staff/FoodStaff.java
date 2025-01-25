package org.website.userpanel.models.food_staff;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.website.userpanel.models.worker.Worker;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("FOOD_STAFF")
public class FoodStaff extends Worker {

    @Column(name = "BOOKLET_EXPIRATION_DATE")
    @Temporal(TemporalType.DATE)
    private Date bookletExpirationDate;

    @Column(name = "SPECIALIZATION", length = 30)
    private String specialization;
}
