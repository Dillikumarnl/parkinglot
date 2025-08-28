// src/types.ts

export enum VehicleType {
    CAR = 'CAR',
    MOTORCYCLE = 'MOTORCYCLE',
    BUS = 'BUS'
}

export enum ParkingSpotType {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE'
}

export interface Vehicle {
    vehicle_id?: number; // Optional, as it might not be present on creation
    licensePlate: string;
    type: VehicleType;
}

export interface ParkingSpot {
    spot_id : number;
    spotNumber: string;
    type: ParkingSpotType;
    occupied: boolean;
    parkedVehicle?: Vehicle; // Optional, if spot is not occupied
}

export interface Ticket {
    ticket_id: bigint;
    entryTime: string; // Formatted string from backend
    exitTime: string | null; // Can be null
    fee: number;
    isPaid: boolean;
    vehicle: Vehicle;
    spot: ParkingSpot;
}

// Props interfaces for components
export interface ParkVehicleFormProps {
    onParkSuccess: () => void;
}

export interface UnparkVehicleWorkflowProps {
    onUnparkSuccess: () => void;
}

export interface ParkingLotStatusProps {
    refreshToggle: boolean;
}