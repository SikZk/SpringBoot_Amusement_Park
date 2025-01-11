package org.website.adminpanel.models.park_staff;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.website.adminpanel.models.worker.Worker;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("PARK_STAFF")
public class ParkStaff extends Worker {


        @Column(name = "IS_TRAINING_COMPLETED")
        private Character isTrainingCompleted;

        @Column(name = "FEAR_OF_HEIGHTS")
        private Character fearOfHeights;
    }
