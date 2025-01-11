package org.website.adminpanel.models.owner;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@Table(name = "OWNERS")
@NoArgsConstructor
@AllArgsConstructor
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_OWNERS")
    @SequenceGenerator(name = "SEQ_OWNERS", sequenceName = "SEQ_OWNERS", allocationSize = 1)
    @Column(name = "OWNER_ID", nullable = false)
    private Integer ownerId;

    @Column(name = "NAME", nullable = false, length = 30)
    private String name;

    @Column(name = "SURNAME", nullable = false, length = 30)
    private String surname;
}
