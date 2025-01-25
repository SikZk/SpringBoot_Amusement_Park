package org.website.userpanel.models.paid_attraction;


import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.website.userpanel.models.attraction.Attraction;

import java.math.BigDecimal;

@Data
@SuperBuilder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("PAID_ATTRACTIONS")
public class PaidAttraction extends Attraction {


    @Column(name = "PRICE", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "IS_FREE_FOR_CHILDREN")
    private Character isFreeForChildren;
}
