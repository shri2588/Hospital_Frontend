import {React, useState, useRef} from 'react';
import { Card, Container, Row , Col ,Form, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom'

function RequestForms(){

    const [validated, setValidated] = useState(false);
    const [redirect, setRedirect] = useState(false);

    let hospitalName = useRef(null)
    let ownerName = useRef(null)
    let ownerContact = useRef(null)
    let ownerEmail = useRef(null)
    let hospitalReg = useRef(null)
    let hospitalType = useRef(null)
    let hospitalGovernment = useRef(null)
    let hospitalAddress = useRef(null)
    let hospitalPincode = useRef(null)
    let hospitalPassword = useRef(null)
    let hospitalState = useRef(null)
    let hospitalDistrict = useRef(null)
    let hospitalWebsite = useRef(null)
    let hospitalLongitude = useRef(null)
    let hospitalLatitude = useRef(null)

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        event.preventDefault();
        const HospitalName = hospitalName.current.value;
        const OwnerName = ownerName.current.value;
        const OwnerContact = ownerContact.current.value;
        const OwnerEmail = ownerEmail.current.value;
        const HospitalReg = hospitalReg.current.value;
        const HospitalType = hospitalType.current.value;
        const HospitalGovernment = hospitalGovernment.current.value;
        const HospitalAddress = hospitalAddress.current.value;
        const HospitalPincode = hospitalPincode.current.value;
        const HospitalPassword = hospitalPassword.current.value;
        const HospitalState = hospitalState.current.value;
        const HospitalDistrict = hospitalDistrict.current.value;
        const HospitalWebsite = hospitalWebsite.current.value;
        const HospitalLongitude = hospitalLongitude.current.value;
        const HospitalLatitude = hospitalLatitude.current.value;
        
        console.log(
            HospitalName,
            OwnerName,
            OwnerContact,
            OwnerEmail,
            HospitalReg,
            HospitalType,
            HospitalGovernment,
            HospitalAddress,
            HospitalPincode,
            HospitalPassword,
            HospitalState,
            HospitalDistrict,
            HospitalWebsite,
            HospitalLongitude,
            HospitalLatitude,
        )

        const requestBody = {
            query: `
            mutation {
                createHospital(input:{
                    hospitalName:"${HospitalName}"
                    hospitalRegistrationNo:"${HospitalReg}"
                    hospitalType:"${HospitalType}"
                    government:"${HospitalGovernment}"
                    address:"${HospitalAddress}"
                    state:"${HospitalState}"
                    district:"${HospitalDistrict}"
                    pincode:"${HospitalPincode}"
                    website:"${HospitalWebsite}"
                    lognitude:"${HospitalLongitude}"
                    latitude:"${HospitalLatitude}"
                    ownerName:"${OwnerName}"
                    ownerContactNo:"${OwnerContact}"
                    ownerEmail:"${OwnerEmail}"
                    password:"${HospitalPassword}"
                    status:"Pending"
                  })
                  {
                    _id
                    hospitalName
                  }
            }
            `
        };



        fetch('http://localhost:4000/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        alert("Hospital Register Successfully.")
        //event.target.reset();
        setRedirect(true)
    };

    if(redirect){
        return <Redirect to="/hospital_login" />
    }
    return(
        <>
     <Container style={{ marginTop: '30px' }} >
    <Card style={{borderRadius:'30px 30px 30px 30px'}}>
    <Card.Header style={{textAlign:'center',fontWeight:'700',borderRadius:'5px 5px 0 0px',fontSize:'1.6rem', backgroundColor:'#2980b9',color:'white',borderRadius:'30px 30px 0px 0px'}}>Register Your Hospital </Card.Header>
        <Card.Body style={{marginTop:'-20px',marginBottom: '-20px'}}>
            <Row>
                <Col md={5} className="col_img">
                </Col>
                <Col md={7}  style={{marginTop:'20px'}}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Form.Row>
                                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                                <Form.Label>Hospital Name</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Hospital Name"
                                                    ref = {hospitalName}
                                                    
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide Hospital name.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Owner Name</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Owner Name"
                                                    ref = {ownerName}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide Owner name.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                <Form.Label>Owner Contact No.</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Owner Contact number"
                                                    ref = {ownerContact}
                                                    
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide Correct Owner Contact NO.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="6" controlId="validationCustom04">
                                                <Form.Label>Owner Email Address</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Owner Email Id"
                                                    ref = {ownerEmail}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide Owner Email Id.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom05">
                                                <Form.Label>Hospital Registration Number</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Hospital Registration Number "
                                                    ref = {hospitalReg}
                                                    
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide Correct Registration Number.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Group as={Col} md="6" controlId="validationCustom06">
                                                <Form.Label>Hospital Type</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    
                                                    as="select" ref = {hospitalType}>
                                                    <option>Select Hospital Type</option>
                                                    <option>PHC</option>
                                                    <option>CHC</option>
                                                    <option>District Hospital</option>
                                                    <option>Specialised Hospital</option>
                                                    <option>Super Speciality</option>
                                                    <option>General Hospital</option>
                                                    <option>Civil Hospital</option>
                                                    <option>Medical College</option>

                                                    
                                                    </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide Hospital Type.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom07">
                                                <Form.Label>Government</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    
                                                    as="select" ref = {hospitalGovernment}>
                                                    <option>Select Category of Hospital </option>
                                                    <option>Central</option>
                                                    <option>State</option>
                                                    <option>Autonomus</option>
                                                    <option>Society</option>
                                                    <option>Cooperative</option>

                                                    
                                                    </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide Hospital Category.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            
                                        </Form.Row>
                                        
                                        <Form.Row>
                                            <Form.Group as={Col} md="12" controlId="validationCustom08">
                                                <Form.Label>Hospital Address</Form.Label>
                                                <Form.Control 
                                                    as="textarea"
                                                    required
                                                    type="text"
                                                    placeholder="Enter Your Hospital Address "
                                                    ref = {hospitalAddress}
                                          
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide correct Address.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="6" controlId="validationCustom09">
                                                <Form.Label>Hospital Pincode</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter pincode"
                                                    ref = {hospitalPincode}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter Correct pincode.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom10">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    placeholder="Enter Password"
                                                    ref = {hospitalPassword}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter Correct Password.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="6" controlId="validationCustom09">
                                                <Form.Label>State in which hospital Located</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter State"
                                                    ref = {hospitalState}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter Correct State.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom10">
                                                <Form.Label>District in which hospital Located</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter District"
                                                    ref = {hospitalDistrict}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter Correct District.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Group as={Col} md="12" controlId="validationCustom11">
                                                <Form.Label>Hospital Website:</Form.Label>
                                                <Form.Control 
                                                    as="textarea"
                                                    required
                                                    type="text"
                                                    placeholder="Enter Your Hospital Website "
                                                    ref = {hospitalWebsite}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide correct Website.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="6" controlId="validationCustom12">
                                                <Form.Label> Please Enter Hospital Longitude</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Longitude"
                                                    ref = {hospitalLongitude}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter Correct Longitude.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom13">
                                                <Form.Label>Enter Hospital Latitude</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Enter Latitude"
                                                    ref = {hospitalLatitude}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please enter Correct Latitude.
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>

                                        <center>
                                        <Button type="submit">Submit form</Button>
                                        </center>
 
                                    </Form>
                </Col>
            </Row>
        </Card.Body>
    </Card>
     </Container>
<br></br>
        </>
    )
}

export default RequestForms;