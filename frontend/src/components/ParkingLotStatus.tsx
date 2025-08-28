// src/components/ParkingLotStatus.tsx
import React, { useState, useEffect } from 'react';
import { Card, Spinner, Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import { ParkingLotStatusProps, ParkingSpot } from '../types'; // Import types

const ParkingLotStatus: React.FC<ParkingLotStatusProps> = ({ refreshToggle }) => {
    const [totalSpots, setTotalSpots] = useState<number>(0);
    const [availableSpots, setAvailableSpots] = useState<number>(0);
    const [reservedSpots, setReservedSpots] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStatus = async () => {
        setLoading(true);
        setError(null);
        try {
            // Axios response type is an array of ParkingSpot
            const allSpotsResponse = await axios.get<ParkingSpot[]>('http://localhost:8080/api/parkinglot/spots');
            setTotalSpots(allSpotsResponse.data.length);

            const availableSpotsResponse = await axios.get<ParkingSpot[]>('http://localhost:8080/api/parkinglot/spots/availableSpots');
            setAvailableSpots(availableSpotsResponse.data.length);

            const reservedSpotsResponse = await axios.get<ParkingSpot[]>('http://localhost:8080/api/parkinglot/spots/reservedSpots');
            setReservedSpots(reservedSpotsResponse.data.length);

        } catch (err: any) {
            const errorMessage = err.response && err.response.data ? (err.response.data.message || JSON.stringify(err.response.data)) : 'Failed to fetch parking lot status. Ensure backend is running.';
            setError(errorMessage);
            console.error("Status fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
        // Set up an interval to refresh status every 10 seconds (optional, but good for real-time)
        const interval = setInterval(fetchStatus, 100000);
        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [refreshToggle]);

    return (
        <Card className="text-center bg-light rounded-3 shadow-sm">
            <Card.Body>
                <Card.Title className="text-secondary fw-bold mb-3">Parking Lot Status</Card.Title>
                {loading && <Spinner animation="border" role="status" className="text-primary" />}
                {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}
                {!loading && !error && (
                    <>
                        <Card.Text className="display-4 fw-bold text-success">
                            {availableSpots} / {totalSpots}
                        </Card.Text>
                        <Card.Text className="text-muted">
                            Available Spots
                        </Card.Text>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default ParkingLotStatus;