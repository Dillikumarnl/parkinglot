package xyz.dillikumar.parking_lot_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.dillikumar.parking_lot_system.model.Enums.*;
import xyz.dillikumar.parking_lot_system.model.ParkingSpot;
import xyz.dillikumar.parking_lot_system.model.Ticket;
import xyz.dillikumar.parking_lot_system.model.Vehicle;
import xyz.dillikumar.parking_lot_system.repository.ParkingSpotRepository;
import xyz.dillikumar.parking_lot_system.repository.TicketRepository;
import xyz.dillikumar.parking_lot_system.repository.VehicleRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ParkingLotService {

    @Autowired
    private ParkingSpotRepository parkingSpotRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    public Ticket parkVehicle(Vehicle vehicle) {
        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        // Find an available spot based on vehicle type
        ParkingSpotType spotType = getSpotTypeForVehicle(vehicle.getType());
        List<ParkingSpot> availableSpots = parkingSpotRepository.findByIsOccupiedFalseAndType(spotType);


        if (availableSpots.isEmpty()) {
            return null; // No spot available
        }

        ParkingSpot spot = availableSpots.get(0);
        spot.setOccupied(true);
        spot.setParkedVehicle(savedVehicle);
        parkingSpotRepository.save(spot);

        Ticket ticket = new Ticket();
        ticket.setVehicle(savedVehicle);
        ticket.setSpot(spot);
        ticket.setEntryTime(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    public double knowFee(Long ticketId){
        Ticket ticket = getTicketOrThrow(ticketId);
        return calculateFee(ticket);
    }

    public void payFee(Long ticketId){
        Ticket ticket = getTicketOrThrow(ticketId);
        if(ticket.getExitTime() == null){
            ticket.setFee(calculateFee(ticket));
        }
        ticket.setPaid(true);
        ticketRepository.save(ticket);
    }

    private Ticket getTicketOrThrow(Long ticketId) {
        return ticketRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found."));
    }

    public void unParkVehicle(Long ticketId) {
        Ticket ticket = getTicketOrThrow(ticketId);

        if(!ticket.isPaid()){
            throw new IllegalStateException("Fee has not been paid for this ticket.");
        }

        ticket.setExitTime(LocalDateTime.now());

        // Free up the parking spot
        ParkingSpot spot = ticket.getSpot();
        spot.setOccupied(false);
        spot.setParkedVehicle(null);
        parkingSpotRepository.save(spot);

        ticketRepository.save(ticket);
    }

    // Helper method to determine spot type based on vehicle type
    private ParkingSpotType getSpotTypeForVehicle(VehicleType type) {
        // Simple logic: Car -> MEDIUM, Bus -> LARGE, Motorcycle -> SMALL
        // Could be more complex
        return switch (type) {
            case CAR -> ParkingSpotType.MEDIUM;
            case BUS -> ParkingSpotType.LARGE;
            case MOTORCYCLE -> ParkingSpotType.SMALL;
        };
    }

    // Fee calculation logic (Strategy Pattern)
    private double calculateFee(Ticket ticket) {
        // Implement a fee calculation strategy here.
        // For simplicity, let's say $10/hour.

        long durationInHours = java.time.Duration.between(ticket.getEntryTime(),
                (ticket.getExitTime() != null) ? ticket.getExitTime() : LocalDateTime.now()).toHours();

        ParkingSpotType spotType1 = ticket.getSpot().getType();
        int chargeByType = spotType1.equals(ParkingSpotType.SMALL) ? 1 :
                                spotType1.equals(ParkingSpotType.MEDIUM) ? 2 : 3;
        long feeTotal = durationInHours * chargeByType * 10;
        return (10 > feeTotal) ? 10 : feeTotal;
    }

    public List<ParkingSpot> getAllParkingSpots() {
        return parkingSpotRepository.findAll();
    }

    public List<ParkingSpot> getAvailableParkingSpots() {
        return parkingSpotRepository.findByIsOccupiedFalse();
    }

    public List<ParkingSpot> getAllReservedSpots() {
        return parkingSpotRepository.findByIsOccupiedTrue();
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicket(Long ticketId) {
        return getTicketOrThrow(ticketId);
    }
}
