package org.website.userpanel.models.owner;


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
    private Integer ownerId;

    @Column(name = "NAME", length = 30)
    private String name;

    @Column(name = "SURNAME", length = 30)
    private String surname;
}
