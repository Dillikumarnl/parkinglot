package xyz.dillikumar.parking_lot_system.model;

import jakarta.persistence.*;

@Entity
public class ParkingSpot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long spot_id;
    private String spotNumber;

    @Enumerated(EnumType.STRING)
    private Enums.ParkingSpotType type;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean isOccupied = false;

    @OneToOne
    private Vehicle parkedVehicle; // JPA relationship

    // Getters and setters


    public Long getSpot_id() {
        return spot_id;
    }

    public void setSpot_id(Long spot_id) {
        this.spot_id = spot_id;
    }

    public String getSpotNumber() {
        return spotNumber;
    }

    public void setSpotNumber(String spotNumber) {
        this.spotNumber = spotNumber;
    }

    public Enums.ParkingSpotType getType() {
        return type;
    }

    public void setType(Enums.ParkingSpotType type) {
        this.type = type;
    }

    public boolean isOccupied() {
        return isOccupied;
    }

    public void setOccupied(boolean occupied) {
        isOccupied = occupied;
    }

    public Vehicle getParkedVehicle() {
        return parkedVehicle;
    }

    public void setParkedVehicle(Vehicle parkedVehicle) {
        this.parkedVehicle = parkedVehicle;
    }


}