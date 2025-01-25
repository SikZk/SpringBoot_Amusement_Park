package org.website.userpanel.models.park_staff;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.website.userpanel.models.worker.Worker;

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
