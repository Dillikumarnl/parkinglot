// src/components/ParkVehicleForm.tsx
import React, { useState } from 'react';
import { Form, Button, Alert, Card, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { ParkVehicleFormProps, Ticket, VehicleType, Vehicle } from '../types'; // Import types

const ParkVehicleForm: React.FC<ParkVehicleFormProps> = ({ onParkSuccess }) => {
    const [licensePlate, setLicensePlate] = useState<string>('');
    const [vehicleType, setVehicleType] = useState<string>('car'); // Use string for select input value
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setTicket(null);

        try {
            // Ensure the payload matches the backend's expected Vehicle structure
            const payload: Vehicle = {
                licensePlate,
                type: vehicleType.toUpperCase() as VehicleType, // Cast to VehicleType enum
            };

            const endpoint = `http://localhost:8080/api/parkinglot/park/${vehicleType}`;

            // Axios response type is now Ticket
            const response = await axios.put<Ticket>(endpoint, payload);
            setTicket(response.data);
            setLicensePlate('');

            if(onParkSuccess) onParkSuccess();
        } catch (err: any) { // Use 'any' for generic error catching, or define a more specific error interface
            const errorMessage = err.response && err.response.data ? (err.response.data.message || JSON.stringify(err.response.data)) : 'Failed to park vehicle. The lot might be full or an error occurred.';
            setError(errorMessage);
            console.error("Parking error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (

        <Card className="mb-4 rounded-3 shadow-sm">
            <Card.Body>
                <Card.Title className="text-primary fw-bold mb-3">Park a Vehicle</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>License Plate</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter license plate"
                            value={licensePlate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLicensePlate(e.target.value)}
                            required
                            className="rounded-pill"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Select
                            value={vehicleType}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setVehicleType(e.target.value)}
                            required
                            className="rounded-pill"
                        >
                            {/* Render options from VehicleType enum for consistency */}
                            {Object.values(VehicleType).map(type => (
                                <option key={type} value={type.toLowerCase()}>{type}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        className="w-100 rounded-pill shadow-sm"
                    >
                        {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Park Vehicle'}
                    </Button>
                </Form>

                {error && <Alert variant="danger" className="mt-3 rounded-3">{error}</Alert>}

                {ticket && (
                    <Alert variant="success" className="mt-3 rounded-3">
                        <Alert.Heading>Vehicle Parked Successfully! 🎉</Alert.Heading>
                        <p className="mb-1">Your Ticket ID is: {ticket.ticket_id}</p>
                        <p className="mb-0">Entry Time: {ticket.entryTime}</p>
                        <hr />
                        <p className="mb-0 text-muted">Please keep this ID for unparking.</p>
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
};

export default ParkVehicleForm;