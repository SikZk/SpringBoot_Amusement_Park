package org.website.adminpanel.models.ticket;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.website.adminpanel.models.attraction.Attraction;
import org.website.adminpanel.models.client.Client;
import org.website.adminpanel.models.food_point.FoodPoint;

import javax.swing.event.CaretListener;
import java.util.Date;

@Data
@Builder
@Entity
@Table(name = "TICKETS")
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_TICKETS")
    @SequenceGenerator(name = "SEQ_TICKETS", sequenceName = "SEQ_TICKETS", allocationSize = 1)
    @Column(name = "TICKET_ID", nullable = false)
    private Integer ticketId;

    @Column(name = "TICKET_DATE", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date ticketDate;

    @Column(name = "TYPE", nullable = false, length = 30)
    private String type;

    @ManyToOne
    @JoinColumn(name = "CLIENT_ID", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "FOOD_POINT_ID")
    private FoodPoint foodPointId;

    @ManyToOne
    @JoinColumn(name = "ATTRACTION_ID")
    private Attraction attractionId;
}