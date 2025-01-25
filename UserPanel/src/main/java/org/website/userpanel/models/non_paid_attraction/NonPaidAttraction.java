package org.website.userpanel.models.non_paid_attraction;


import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.website.userpanel.models.attraction.Attraction;

@Data
@SuperBuilder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("NON_PAID_ATTRACTIONS")
public class NonPaidAttraction extends Attraction {


    @Column(name = "PHOTOS")
    private Character photos;

    @Column(name = "IS_OPEN_ON_WEEKENDS")
    private Character isOpenOnWeekends;
}
