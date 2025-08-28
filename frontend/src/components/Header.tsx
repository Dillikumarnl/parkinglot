// src/components/Header.tsx
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 rounded-bottom">
            <Container>
                <Navbar.Brand href="#home">Parking Lot System</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;