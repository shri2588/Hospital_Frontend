import React, { useEffect, useRef } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import OtpVerify from './OtpVerify';

function UserForm() {
    const HosTokenById = localStorage.getItem('hospitalIdByToken')
    const [validated, setValidated] = React.useState(false);
    const [wardByHosId, setWardByHosId] = React.useState([]);
    const [wardNameSelect, setWardNameSelect] = React.useState('');
    const [BedType, setBedType] = React.useState([]);
    const [redirect, setRedirect] = React.useState(false);

    let fName = useRef(null)
    let lName = useRef(null)
    let aadharNo = useRef(null)
    let contactNo = useRef(null)
    let email = useRef(null)
    let dob = useRef(null)
    let gender = useRef(null)
    let marital = useRef(null)
    let disease = useRef(null)
    let age = useRef(null)
    let address = useRef(null)
    let state = useRef(null)
    let district = useRef(null)
    let city = useRef(null)
    let pincode = useRef(null)
    let ward = useRef(null)
    let bedtype = useRef(null)




    useEffect(() => {
        fetchWardsByHosId()
    }, [])

    let updatedPrivate = (BedType.privateBeds)-1
    let updatedGeneral = (BedType.generalBeds)-1

    function updateBeds(e){

        if(e === "General Beds")
        {
            const requestUpdateGeneralBedBody = {
                query: `
                mutation {
                    updateBedsByWardName(hospitalId:"${HosTokenById}",wardName:"${ward.current.value}",BedInput:{
                          privateBeds:${BedType.privateBeds}
                          generalBeds:${updatedGeneral}
                          wardsName:"${ward.current.value}"
                        })
                          {
                            _id
                            privateBeds
                            generalBeds
                            wardsName
                          }
                }
                `
            };
    
    
    
            fetch('http://localhost:4000/graphql',{
                method: 'POST',
                body: JSON.stringify(requestUpdateGeneralBedBody),
                headers: {
                    'Content-Type' : 'application/json'
                }
            }) 
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed');
                }
                //alert(" General Bed Successfully!!!");
                
            })
            .catch(err => {
                console.log(err);
            });
        }
        else{
            const requestUpdatePrivateBedBody = {
                query: `
                mutation {
                    updateBedsByWardName(hospitalId:"${HosTokenById}",wardName:"${ward.current.value}",BedInput:{
                          privateBeds:${updatedPrivate}
                          generalBeds:${BedType.generalBeds}
                          wardsName:"${ward.current.value}"
                        })
                          {
                            _id
                            privateBeds
                            generalBeds
                            wardsName
                          }
                }
                `
            };

            fetch('http://localhost:4000/graphql',{
                method: 'POST',
                body: JSON.stringify(requestUpdatePrivateBedBody),
                headers: {
                    'Content-Type' : 'application/json'
                }
            }) 
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed');
                }
                //alert(" Private Bed Successfully!!!");
                
            })
            .catch(err => {
                console.log(err);
            });
        }
       
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        event.preventDefault();
        const FName = fName.current.value;
        const LName = lName.current.value;
        const AadharNo = aadharNo.current.value;
        const ContactNo = contactNo.current.value;
        const Email = email.current.value;
        const Dob = dob.current.value;
        const Gender = gender.current.value;
        const Marital = marital.current.value;
        const Disease = disease.current.value;
        const Age = age.current.value;
        const Address = address.current.value;
        const State = state.current.value;
        const District = district.current.value;
        const City = city.current.value;
        const Pincode = pincode.current.value;
        const Ward = ward.current.value;
        const Bedtype = bedtype.current.value;

        console.log(
            FName, 
            LName ,
            AadharNo ,
            ContactNo,
            Email ,
            Dob ,
            Gender,
            Marital,
            Disease, 
            Age ,
            Address ,
            State,
            District ,
            City ,
            Pincode,
            Ward,
            Bedtype
        )
        const requestUpdateBody = {
            query: `
            mutation {
                createPatientAdmit(hospitalId:"${HosTokenById}",bedId:"${BedType._id}",input:{
                    fname:"${FName}"
                    lname:"${LName}"
                    aadharNo:"${AadharNo}"
                    contactNo:"${ContactNo}"
                    email:"${Email}"
                    dob:"${Dob}"
                    gender:"${Gender}"
                    marital:"${Marital}"
                    disease:"${Disease}"
                    age:${Age}
                    address:"${Address}"
                    state:"${State}"
                    district:"${District}"
                    city:"${City}"
                    pincode:"${Pincode}"
                    ward:"${Ward}"
                    bedtype:"${Bedtype}"
                  })
                  {
                    _id
                    fname
                    lname
                    aadharNo
                    contactNo
                    email
                    dob
                    gender
                    marital
                    disease
                    age
                    address
                    state
                    district
                    city
                    pincode
                    ward
                    bedtype
                  }
            }
            `
        };

        if(Ward ===  "Select Any Wards"){
            alert("There is no ward available or Select any Ward")
        }
        else{
            fetch('http://localhost:4000/graphql',{
                method: 'POST',
                body: JSON.stringify(requestUpdateBody),
                headers: {
                    'Content-Type' : 'application/json'
                }
            }) 
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed');
                }
                alert("Patient Admit Successfully!!!");
                setRedirect(true);
                
            })
            .catch(err => {
                console.log(err);
            });
        }


    };




    function fetchWardsByHosId() {

        const requestWard = {
            query: `
               query {
                    getBedsByHosId(hospitalId:"${HosTokenById}"){
                        _id
                        privateBeds
                        generalBeds
                        wardsName
                    }
                }
                  `
        };




        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestWard),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed');
                }
                return res.json();
            })
            .then(resData => {
                const fetchWards = resData.data.getBedsByHosId;
                setWardByHosId(fetchWards);
                console.log("WardsByHosId", fetchWards)
            })
            .catch(err => {
                console.log(err);
            });

    }

    function fetchBedType(e) {

        const requestBedType = {
            query: `
               query {
                getBedTypeByHosId(hospitalId:"${HosTokenById}",wardName:"${e}"){
                    _id
                    privateBeds
                    generalBeds
                    wardsName
                  }
                }
                  `
        };




        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBedType),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed');
                }
                return res.json();
            })
            .then(resData => {
                const fetchBedType = resData.data.getBedTypeByHosId;
                setBedType(fetchBedType);
            })
            .catch(err => {
                console.log(err);
            });




    }

    console.log("WardsByHosId", wardByHosId)
    console.log("WardName", wardNameSelect)
    console.log("BedType", BedType)

    if(redirect)
    {
        return <OtpVerify />
    }
    return (
        <>
            <Container style={{ marginTop: '30px' }} >
                <Card style={{ borderRadius: '30px 30px 30px 30px' }}>
                    <Card.Header style={{ textAlign: 'center', fontWeight: '700', borderRadius: '5px 5px 0 0px', fontSize: '1.6rem', backgroundColor: '#2980b9', color: 'white', borderRadius: '30px 30px 0px 0px' }}>Fill Patient Details</Card.Header>
                    <Card.Body style={{ marginTop: '-20px', marginBottom: '-20px' }}>
                        <Row>
                            <Col md={5} className="col_img">
                            </Col>
                            <Col md={7} style={{ marginTop: '20px' }}>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Patient First Name"
                                                ref={fName}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide Patient First name.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Patient Last name"
                                                ref={lName}

                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide Patient Last name
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                                            <Form.Label>Aadhar Number</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Aadhar Number "
                                                ref={aadharNo}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide Aadhar Number.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom05">
                                            <Form.Label>Contact No.</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Contact number"
                                                ref={contactNo}

                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide Correct Contact NO.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom06">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Email Id"
                                                ref={email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide Email Id.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom07">
                                            <Form.Label>Date Of Birth</Form.Label>
                                            <Form.Control
                                                required
                                                type="date"
                                                ref={dob}

                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide Correct Date Of Birth.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom08">
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                as="select"
                                                ref={gender}
                                                >
                                                <option>Select Gender</option>

                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide Gender.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom09">
                                            <Form.Label>Marital Status</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                as="select"
                                                ref={marital}
                                                >
                                                <option>Select Marital Status</option>

                                                <option>Married</option>
                                                <option>Unmarried</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide Marital Status.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom10">
                                            <Form.Label>Patient Disease</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Patient Disease"
                                                ref={disease}

                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please Enter Patient Diseas.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom11">
                                            <Form.Label>Age</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Patient Age"
                                                ref={age}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please Enter Patient Age.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom12">
                                            <Form.Label>Patient Permanent Address:</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                required
                                                type="text"
                                                placeholder="Enter Patient Permanent Address:"
                                                ref={address}

                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please Patient Permanent Address:.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom13">
                                            <Form.Label>State:</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter State"
                                                ref={state}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter Correct State.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom14">
                                            <Form.Label>District:</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter District"
                                                ref={district}

                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter Correct District.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom15">
                                            <Form.Label>City:</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter City"
                                                ref={city}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter Correct City.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom16">
                                            <Form.Label>Enter Pincode:</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Pincode"
                                                ref={pincode}

                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter Correct Pincode.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom08">
                                            <Form.Label>Ward</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                as="select"
                                                onChange={e => {
                                                    setWardNameSelect(e.target.value)
                                                    fetchBedType(e.target.value)
                                                }
                                                }
                                                ref={ward}
                                                >
                                                <option>Select Any Wards</option>
                                                {
                                                    wardByHosId === null ? null :
                                                        wardByHosId.map(ward =>
                                                            <option key={ward._id}>{ward.wardsName}</option>
                                                        )

                                                }


                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide Ward.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom09">
                                            <Form.Label>Bed Type</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                as="select"
                                                ref={bedtype}
                                                >
                                                <option>General Beds</option>
                                                <option>Private Beds</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide Bed Type.
                                                </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                    </Form.Row>
                                    <center>
                                        <Button type="submit" onClick={()=> updateBeds(bedtype.current.value)}>Submit form</Button>
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

export default UserForm;