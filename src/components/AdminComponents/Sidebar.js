import { Nav, Tab, Row, Col } from 'react-bootstrap';
import Table from './AllHospitals';
import PendingHospitals from './PendingHospitals';

function Sidebar() {

    return (
        <>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2} style={{backgroundColor:'#34495e'}}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first" style={{color:'white', fontSize:'20px',padding:'10px'}}>Active Hospitals</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" style={{color:'white', fontSize:'20px',padding:'10px'}}>Pending Hospitals</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10} style={{border:'2px solid black'}}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first" >
                                <Table />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <PendingHospitals />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Request />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <All />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">
                                <Edit />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}


function Request() {
    return (
        <h1>Request</h1>
    )
}

function All() {
    return (
        <h1>All</h1>
    )
}

function Edit() {
    return (
        <h1>Edit</h1>
    )
}


export default Sidebar;