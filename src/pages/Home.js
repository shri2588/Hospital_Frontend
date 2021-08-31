import { React, useState, useEffect, useRef } from 'react';
import { Col, Container, Row, Card, Button, Form } from 'react-bootstrap';
import NavbarMenu from '../components/NavbarMenu';
import Map from './map/mapWork'
function Home() {


    const [validated, setValidated] = useState(false);

    const [UserLocation, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" }
    })


    let fName = useRef(null)
    let pName = useRef(null)
    let contact = useRef(null)
    let aadhar = useRef(null)

    const [userDetails, setUserDetails] = useState({
        fullName: "",
        patientName: "",
        contact: "",
        aadhar: "",
        status: false
    })

    const onSuccess = (Ulocation) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: Ulocation.coords.latitude,
                lng: Ulocation.coords.longitude
            }
        })
    }

    const onError = error => {
        setLocation({
            loaded: true,
            error
        })
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported"
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    }, [])


    console.log("UserLocation", UserLocation)


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            event.preventDefault();
            const Fname = fName.current.value
            const Pname = pName.current.value
            const Contact = contact.current.value
            const Aadhar = aadhar.current.value
    
            setUserDetails({
                fullName: Fname,
                patientName: Pname,
                contact: Contact,
                aadhar: Aadhar,
                status: true
            })
            console.log(Fname, Pname, Contact, Aadhar)
        }
        setValidated(true);
        
    };
    console.log("User", userDetails)

    if (userDetails.status === true) {
        return (
            <div className="header-wraper">
                <Map userDetails={userDetails} UserLocation={UserLocation}/>
            </div>
        )
    }
    return (

        <div className="header-wraper">
            <NavbarMenu />
            <div className="main-info">
                <Container>
                    <Row>
                        <Col style={{ marginTop: '100px' }}>
                            <Card style={{ borderRadius: '30px' }}>
                                <Card.Header style={{ textAlign: 'center', fontWeight: '700', borderRadius: '30px 30px 0 0px', fontSize: '1.6rem', backgroundColor: '#2980b9', color: 'white' }}>Book Your Bed</Card.Header>
                                <Card.Body>
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Form.Row>
                                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Full Name"
                                                    ref={fName}
                                                    style={{borderRadius:'0px'}}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide name.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Patient Name</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Patient Name"
                                                    ref={pName}
                                                    style={{borderRadius:'0px'}}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide patient name.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>


                                        <Form.Row>
                                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                <Form.Label>Contact No</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Contact No"
                                                    ref={contact}
                                                    style={{borderRadius:'0px'}}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide correct contact number.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom04">
                                                <Form.Label>Aadhar No</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Aadhar No"
                                                    ref={aadhar}
                                                    style={{borderRadius:'0px'}}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide correct aadhar number.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <center>
                                            <Button type="submit" style={{borderRadius:'0px'}} size="sm" variant="primary">Submit form</Button>
                                        </center>

                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        </div>

    )
}


export default Home;