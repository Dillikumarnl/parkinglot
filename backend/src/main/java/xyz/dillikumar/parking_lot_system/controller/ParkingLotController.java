package xyz.dillikumar.parking_lot_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import xyz.dillikumar.parking_lot_system.model.*;
import xyz.dillikumar.parking_lot_system.service.ParkingLotService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/parkinglot")
public class ParkingLotController {

    @Autowired
    private ParkingLotService parkingLotService;

    @PutMapping("/park/car")
    public ResponseEntity<Ticket> parkVehicle(@RequestBody Car car) { // Use specific vehicle for request body
        Ticket ticket = parkingLotService.parkVehicle(car);
        if (ticket != null) {
            return ResponseEntity.ok(ticket);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PutMapping("/park/bus")
    public ResponseEntity<Ticket> parkVehicle(@RequestBody Bus bus) { // Use specific vehicle for request body
        Ticket ticket = parkingLotService.parkVehicle(bus);
        if (ticket != null) {
            return ResponseEntity.ok(ticket);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PutMapping("/park/cycle")
    public ResponseEntity<Ticket> parkVehicle(@RequestBody Motorcycle motorcycle) { // Use specific vehicle for request body
        Ticket ticket = parkingLotService.parkVehicle(motorcycle);
        if (ticket != null) {
            return ResponseEntity.ok(ticket);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/fee/{ticketId}")
    public ResponseEntity<Double> getFee(@PathVariable Long ticketId){
        try {
            double fee =  parkingLotService.knowFee(ticketId);
            return ResponseEntity.ok(fee);
        }catch (IllegalArgumentException e){
            return ResponseEntity.notFound().build();
        }

    }

    @PostMapping("/payFee/{ticketId}")
    public ResponseEntity<String> payFee(@PathVariable Long ticketId){
        try {
            parkingLotService.payFee(ticketId);
            return ResponseEntity.ok("Payment Successful for ticket "+ ticketId);
        }catch (IllegalArgumentException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/unPark/{ticketId}")
    public ResponseEntity<String> unParkVehicle(@PathVariable Long ticketId) {
        try {
            parkingLotService.unParkVehicle(ticketId);
            return ResponseEntity.ok("Vehicle UnParked Successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }catch (IllegalStateException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/spots")
    public ResponseEntity<List<ParkingSpot>> getAllParkingSpots() {
        List<ParkingSpot> spots = parkingLotService.getAllParkingSpots();
        return ResponseEntity.ok(spots);
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getAllTickets(){
        List<Ticket> registeredTickets = parkingLotService.getAllTickets();
        return ResponseEntity.ok(registeredTickets);
    }

    @GetMapping("/tickets/{ticketId}")
    public ResponseEntity<Ticket> getTicket(@PathVariable Long ticketId){
        Ticket ticket =  parkingLotService.getTicket(ticketId);
        return ResponseEntity.ok(ticket);

    }

    @GetMapping("/spots/availableSpots")
    public ResponseEntity<List<ParkingSpot>> getAvailableSpots() {
        List<ParkingSpot> availableSpots = parkingLotService.getAvailableParkingSpots();
        return ResponseEntity.ok(availableSpots);
    }
    @GetMapping("/spots/reservedSpots")
    public ResponseEntity<List<ParkingSpot>> getReservedSpots(){
        List<ParkingSpot> reservedSpots = parkingLotService.getAllReservedSpots();
        return ResponseEntity.ok(reservedSpots);
    }

}
