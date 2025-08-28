package xyz.dillikumar.parking_lot_system.config;

import xyz.dillikumar.parking_lot_system.model.Enums.ParkingSpotType;
import xyz.dillikumar.parking_lot_system.model.ParkingSpot;
import xyz.dillikumar.parking_lot_system.repository.ParkingSpotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ParkingSpotInitializer implements CommandLineRunner {

    @Autowired
    private ParkingSpotRepository parkingSpotRepository;

    @Value("${parking.total-spots:50}") // Default to 50 spots if not specified
    private int totalSpots;

    public void setTotalSpots(int totalSpots) {
        this.totalSpots = totalSpots;
    }

    @Override
    public void run(String... args) throws Exception {
        if (parkingSpotRepository.count() == 0) {
            System.out.println("Initializing " + totalSpots + " parking spots...");
            List<ParkingSpot> spots = new ArrayList<>();

            // For demonstration, let's create a mix of spot types
            for (int i = 1; i <= totalSpots; i++) {
                ParkingSpot spot = new ParkingSpot();
                spot.setSpotNumber("A-" + i);

                if (i % 5 == 0) {
                    spot.setType(ParkingSpotType.LARGE); // 20% large spots
                } else if (i % 3 == 0) {
                    spot.setType(ParkingSpotType.SMALL); // ~33% small spots
                } else {
                    spot.setType(ParkingSpotType.MEDIUM); // ~47% medium spots
                }

                spots.add(spot);
            }
            parkingSpotRepository.saveAll(spots);
            System.out.println("Parking lot initialization complete.");
        }
    }
}