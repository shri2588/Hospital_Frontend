import { Nav, Tab, Row, Col } from 'react-bootstrap';
import HospitalDetails from './HospitalDetails'
import DisplayWards from './DispayWards'
import DisplayDoctors from './DisplayDoctors'
import DisplayBeds from './DisplayBeds'
import OtpVerify from './OtpVerify'
import AllAdmitPatients from './AllAdmitPatients'
function Sidebar() {

    return (
        <>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2} style={{backgroundColor:'#34495e'}}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first" style={{color:'white', fontSize:'20px',padding:'10px'}}>Otp Verification</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" style={{color:'white', fontSize:'20px',padding:'10px'}}>Patients Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third" style={{color:'white', fontSize:'20px',padding:'10px'}}>Enter Hospital Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth" style={{color:'white', fontSize:'20px',padding:'10px'}}>Hospital Wards</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fifth" style={{color:'white', fontSize:'20px',padding:'10px'}}>Hospital Doctors</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="sixth" style={{color:'white', fontSize:'20px',padding:'10px'}}>Hospital Beds</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10} style={{border:'2px solid black'}}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first" >
                                <OtpVerify />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <AllAdmitPatients />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <HospitalDetails />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <DisplayWards />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">
                                <DisplayDoctors />
                            </Tab.Pane>
                            <Tab.Pane eventKey="sixth">
                                <DisplayBeds />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}




function Details() {
    return (
        <h1>Details</h1>
    )
}
function Wards() {
    return (
        <h1>Wards</h1>
    )
}
function Doctors() {
    return (
        <h1>Doctors</h1>
    )
}
function Beds() {
    return (
        <h1>Edit</h1>
    )
}


export default Sidebar;