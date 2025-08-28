package xyz.dillikumar.parking_lot_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import xyz.dillikumar.parking_lot_system.model.Enums.ParkingSpotType;
import xyz.dillikumar.parking_lot_system.model.ParkingSpot;

public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, Long> {
    List<ParkingSpot> findByIsOccupiedFalseAndType(ParkingSpotType type);
    List<ParkingSpot> findByIsOccupiedFalse();

    List<ParkingSpot> findByIsOccupiedTrue();
}
