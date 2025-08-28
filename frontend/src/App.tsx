// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import ParkVehicleForm from './components/ParkVehicleForm';
import UnparkVehicleWorkflow from './components/UnparkVehicleWorkflow';
import ParkingLotStatus from './components/ParkingLotStatus';
import { Container, Row, Col } from 'react-bootstrap';

const App: React.FC = () => {
  const [refreshToggle, setRefreshToggle] = useState<boolean>(false);

  const handleStatusRefresh = () => {
    setRefreshToggle(prev => !prev);
  };

  return (
      <>
        <Header />
        <Container>
          <div className="mb-4">
            <ParkingLotStatus refreshToggle={refreshToggle} />
          </div>
          <Row>
            <Col md={6}>
              <ParkVehicleForm onParkSuccess={handleStatusRefresh} />
            </Col>
            <Col md={6}>
              <UnparkVehicleWorkflow onUnparkSuccess={handleStatusRefresh} />
            </Col>
          </Row>
        </Container>
      </>
  );
};

export default App;