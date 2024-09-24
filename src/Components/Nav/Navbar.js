
import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Navbar.css'; 
import Authcontext from '../../Store/Auth_Context';

const NavBar = () => {
    const navigate = useNavigate()
    const Auth_ctx = useContext(Authcontext)
    const onLogout = ()=>{
        Auth_ctx.logoutHandler()
        navigate('/login')
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Navbar.Brand as={Link} to="/home">Stone Paper Scissors</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/game-states">All Game States</Nav.Link>
                </Nav>
                <Button variant="outline-light" onClick={()=>onLogout()}>Logout</Button>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
