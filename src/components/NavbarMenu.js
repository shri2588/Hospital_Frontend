import {React} from 'react';
import logo from '../logo.png';
import { Navbar, Nav } from 'react-bootstrap';


function NavbarMenu() {
    return (
        <>         
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Navbar.Brand href="/"><img
                                src={logo}
                                width="40"
                                height="40"
                                className="d-inline-block align-top"
                                alt="logo"
                                style={{ marginRight: '5px' }}
                            />HOSPITAL</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="ml-auto">

                                {
                                    localStorage.getItem('token') ?
                                    <>
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/objectives">Objectives</Nav.Link>
                                    <Nav.Link href="/guide">Guide</Nav.Link>
                                    <Nav.Link href="/about">About Us</Nav.Link>
                                    <Nav.Link href="/contact">Contact Us</Nav.Link> 
                                    <Nav.Link href="/admin_dashboard">Dashboard</Nav.Link> 
                                    <Nav.Link href="/logout">Logout</Nav.Link> 
                                    </>

                                    : localStorage.getItem('hosToken') ?

                                    <>
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/objectives">Objectives</Nav.Link>
                                    <Nav.Link href="/guide">Guide</Nav.Link>
                                    <Nav.Link href="/about">About Us</Nav.Link>
                                    <Nav.Link href="/contact">Contact Us</Nav.Link> 
                                    <Nav.Link href="/hospitalDashboard">Dashboard</Nav.Link> 
                                    <Nav.Link href="/hospitalLogout">Logout</Nav.Link>
                                    </>

                                    :

                                    <>
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/objectives">Objectives</Nav.Link>
                                    <Nav.Link href="/guide">Guide</Nav.Link>
                                    <Nav.Link href="/about">About Us</Nav.Link>
                                    <Nav.Link href="/contact">Contact Us</Nav.Link> 
                                    <Nav.Link href="/admin_login">Admin Login</Nav.Link>
                                    <Nav.Link href="/hospital_login">Hospital Login</Nav.Link>
                                    </>

                                }                                                                                                                                                                                                           
                                </Nav>

                            </Navbar.Collapse>
                        </Navbar>

        </>
    )
}

export default NavbarMenu;