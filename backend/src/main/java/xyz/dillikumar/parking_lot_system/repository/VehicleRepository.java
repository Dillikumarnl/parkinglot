package xyz.dillikumar.parking_lot_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import xyz.dillikumar.parking_lot_system.model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
