// src/components/UnparkVehicleWorkflow.tsx
import React, { useState } from 'react';
import { Form, Button, Alert, Card,Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import {Ticket, UnparkVehicleWorkflowProps} from '../types';

const UnparkVehicleWorkflow: React.FC<UnparkVehicleWorkflowProps> = ({ onUnparkSuccess }) => {
    const [ticketId, setTicketId] = useState<string>('');
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [fee, setFee] = useState<number | null>(null);
    const [paid, setPaid] = useState<boolean>(false);
    const [unparked, setUnparked] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const resetWorkflowState = () => {
        setFee(null);
        setPaid(false);
        setUnparked(false);
        setError(null);
    };

    const handleKnowFee = async () => {
        setLoading(true);
        resetWorkflowState();
        try {
            if (!ticketId) {
                setError('Please enter a Ticket ID.');
                return;
            }
            // Axios response type is number (the fee)
            const response = await axios.get<number>(`http://localhost:8080/api/parkinglot/fee/${ticketId}`);
            setFee(response.data);
        } catch (err: any) {
            const errorMessage = err.response && err.response.data ? (err.response.data.message || JSON.stringify(err.response.data)) : 'Error getting fee. Please check the ticket ID.';
            setError(errorMessage);
            console.error("Know Fee error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePayFee = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.post(`http://localhost:8080/api/parkinglot/payFee/${ticketId}`);
            setPaid(true);
        } catch (err: any) {
            const errorMessage = err.response && err.response.data ? (err.response.data.message || JSON.stringify(err.response.data)) : 'Error paying fee.';
            setError(errorMessage);
            console.error("Pay Fee error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUnpark = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.put(`http://localhost:8080/api/parkinglot/unPark/${ticketId}`);
            setUnparked(true);

            if(onUnparkSuccess) onUnparkSuccess();
        } catch (err: any) {
            const errorMessage = err.response && err.response.data ? (err.response.data.message || JSON.stringify(err.response.data)) : 'Error unparking vehicle. Fee might not be paid or ticket is invalid.';
            setError(errorMessage);
            console.error("Unpark error:", err);
        } finally {
            setLoading(false);
        }
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <Card className="rounded-3 shadow-sm">
            <Card.Body>
                <Card.Title className="text-danger fw-bold mb-3">Unpark a Vehicle</Card.Title>
                <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                    <Form.Group className="mb-3">
                        <Form.Label>Ticket ID</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your ticket ID"
                            value={ticketId}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setTicketId(e.target.value);
                                resetWorkflowState();
                            }}
                            required
                            className="rounded-pill"
                        />
                    </Form.Group>

                    {loading && <div className="text-center mb-3"><Spinner animation="border" size="sm" /> Loading...</div>}
                    {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}

                    <div className="d-grid gap-2 mb-3">
                        <Button
                            type={"submit"}
                            variant="primary"
                            onClick={handleKnowFee}
                            disabled={loading || !ticketId}
                            className="rounded-pill shadow-sm"
                        >
                            1. Know Fee
                        </Button>
                        {fee !== null && (
                            <Alert variant="secondary" className="mt-2 mb-0 rounded-3">
                                Your current fee is: <strong>${fee.toFixed(2)}</strong> 💰
                            </Alert>
                        )}

                        <Button
                            type={"submit"}
                            variant="success"
                            onClick={handlePayFee}
                            disabled={loading || !fee || paid}
                            className="rounded-pill shadow-sm"
                        >
                            2. Pay Fee
                        </Button>
                        {paid && (
                            <Alert variant="success" className="mt-2 mb-0 rounded-3">
                                Payment Successful! ✅
                            </Alert>
                        )}

                        <Button
                            type={"submit"}
                            variant="outline-primary"
                            onClick={handleUnpark}
                            disabled={loading || !paid}
                            className="rounded-pill shadow-sm"
                        >
                            3. Unpark Vehicle
                        </Button>
                        {unparked && (
                            <Alert variant="success" className="mt-3 rounded-3">
                                <Alert.Heading>Vehicle UnParked Successfully! 🎉</Alert.Heading>
                                <p className="mb-0">Exit Time: {ticket?.exitTime}</p>
                                <hr />
                            </Alert>
                            )}
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default UnparkVehicleWorkflow;
