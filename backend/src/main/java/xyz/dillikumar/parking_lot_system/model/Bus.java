package xyz.dillikumar.parking_lot_system.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("BUS")
public class Bus extends Vehicle{

}
