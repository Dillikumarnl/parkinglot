package xyz.dillikumar.parking_lot_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import xyz.dillikumar.parking_lot_system.model.Ticket;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
