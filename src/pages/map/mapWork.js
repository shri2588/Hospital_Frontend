import { React, useEffect, useState } from "react";
import { Card, Container, Row, Col, Modal, Button, Table } from 'react-bootstrap';
import NavbarMenu from '../../components/NavbarMenu'
import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import haversine from 'haversine-distance'
import Spinner from '../../components/Spinner/Spinner'

function MapWork(props) {
  const [spin, setSpin] = useState(false)
  const [spinWard, setSpinWard] = useState(false)
  const [spinBed, setSpinBed] = useState(false)
  const [spinDoc, setSpinDoc] = useState(false)

  //Model open
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Model close


  //Model open
  const [showConfirm, setShowConfirm] = useState(false);
  const handleConfirmClose = () => setShowConfirm(false);
  const handleConfirmShow = () => setShowConfirm(true);
  //Model close

  //Model open
  const [showBook, setShowBook] = useState(false);
  const handleBookClose = () => setShowBook(false);
  const handleBookShow = () => setShowBook(true);
  //Model close


  //Model open
  const [showBed, setShowBed] = useState(false);
  const handleBedClose = () => setShowBed(false);
  const handleBedShow = () => setShowBed(true);
  //Model close

  //Model open
  const [showDoc, setShowDoc] = useState(false);
  const handleDocClose = () => setShowDoc(false);
  const handleDocShow = () => setShowDoc(true);
  //Model close





  const [stateHospital, setHospitals] = useState([])
  const [wardsById, setWardsById] = useState([])
  const [tempHospitalId, setTempHospitalId] = useState(null)
  const [tempOtp, setTempOtp] = useState('')
  const [bedByHosId, setBedByHosId] = useState([])
  const [docByHosId, setDocByHosId] = useState([])
  const [hosId, setHosId] = useState()
  const [totalPrivateState, setTotalPrivateState] = useState('')
  const [totalGeneralState, setTotalGeneralState] = useState('')
  const [totalBedState, setTotalBedState] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchWardsById()
  }, [tempHospitalId])

  useEffect(() => {
    fetchBedByHosId()
  }, [hosId])

  useEffect(() => {
    fetchDocByHosId()
  }, [tempHospitalId])

  function fetchData() {
    setSpin(true)
    const requestBody = {
      query: `
        query 
        {
          getActiveHospital
            {
                _id
                hospitalName
                hospitalRegistrationNo
                hospitalType
                government
                address
                state
                district
                pincode
                website
                lognitude
                latitude
                ownerName
                ownerContactNo
                ownerEmail
                password
                status
            }
          }
        `
    };



    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
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
        const fetchHospitals = resData.data.getActiveHospital;
        setHospitals(fetchHospitals);
        setSpin(false)
      })
      .catch(err => {
        console.log(err);
        setSpin(false)
      });
  }
  const location = []
  const user = [props.UserLocation.coordinates.lat, props.UserLocation.coordinates.lng]
  console.log("UserLocationProps", user)
  stateHospital.map(hos =>
    location.push({
      hospitalId: hos._id,
      hospitalName: hos.hospitalName,
      hospitalType: hos.hospitalType,
      address: hos.address,
      distance: (haversine(user, [hos.lognitude, hos.latitude]) / 1000).toFixed(2),
    })
  )
  console.log("locationPush", location)

  const sortLocation = location.sort(function (a, b) {
    return a.distance - b.distance;
  })


  console.log("Sort Locations", sortLocation)


  function fetchWardsById() {
    setSpinWard(true)
    const requestBodyWards = {
      query: `
        query 
        {
          getWardsById(id:"${tempHospitalId}"){
            _id
            wardsName
            wardNo
          }
        }
        `
    };



    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBodyWards),
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
        const fetchWardsById = resData.data.getWardsById;
        setWardsById(fetchWardsById);
        setSpinWard(false)
      })
      .catch(err => {
        console.log(err);
        setSpinWard(false)
      });
  }




  console.log("WardsById", wardsById)



  function bookBed(id) {

    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    setTempOtp(OTP);
    const requestBodyBookBed = {
      query: `
        mutation 
        {
          createTempUser(id:"${id}",TempUserInput:{
            UserName:"${props.userDetails.fullName}"
            PatientName:"${props.userDetails.patientName}"
            UserContect:"${props.userDetails.contact}"
            UserAadhar:"${props.userDetails.aadhar}"
            otp:"${OTP}"
          })
          {
            _id
            UserName
            PatientName
            UserContect
            UserAadhar
            otp
          }
        }
        `
    };

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBodyBookBed),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=tanLfhREI83wZdYXNBDC7pUmgPWF1yiVbrzJxAlOsoS6H2QkcqoptES8qjbdNZwfuYzDHsxlWQUAehI0&route=q&message=Your OTP: ${OTP} . Valid for 2 hours&language=english&flash=0&numbers=${props.userDetails.contact}`, {
          method: 'get',
        })
      })


  }



  function fetchBedByHosId() {
    setSpinBed(true)
    const requestOwnBody = {
      query: `
            query 
            {
              getBedsByHosId(hospitalId:"${hosId}"){
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
      body: JSON.stringify(requestOwnBody),
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
        //console.log(resData);
        const fetchOwnBedData = resData.data.getBedsByHosId;
        setBedByHosId(fetchOwnBedData);
        setSpinBed(false)
        let totalPrivate = 0
        bedByHosId.map(pri => {
          totalPrivate = totalPrivate + pri.privateBeds
          setTotalPrivateState(totalPrivate)
        })

        let totalGeneral = 0
        bedByHosId.map(gen => {
          totalGeneral = totalGeneral + gen.generalBeds
          setTotalGeneralState(totalGeneral)

        })

        let totalHospitalBeds = totalPrivate + totalGeneral
        setTotalBedState(totalHospitalBeds)
      })
      .catch(err => {
        console.log(err);
        setSpinBed(false)
      });
  }


  function fetchDocByHosId() {
    setSpinDoc(true)
    const requestOwnBody = {
      query: `
            query 
            {
              getDoctorsByHosId(hospitalId:"${tempHospitalId}"){
                _id
                docName
                docReg
                docSp
                docWard
              }
            }
            `
    };


    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestOwnBody),
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
        //console.log(resData);
        const fetchOwnDocData = resData.data.getDoctorsByHosId;
        setDocByHosId(fetchOwnDocData)
        setSpinDoc(false)
      })
      .catch(err => {
        console.log(err);
        setSpinDoc(false)
      });
  }




  console.log("bedsbyhosid", docByHosId)
  return (
    <>
      <NavbarMenu />
      <Container fluid style={{ marginTop: '50px' }}>
        <Row>
          <Col>
            {
              spin ? <center><Spinner /></center> :
                <div>
                  <MapContainer center={[23.838804, 78.737808]} zoom={13}
                    scrollWheelZoom={true}
                    style={{ width: '100%', height: '500px' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {
                      stateHospital.map(hos => (
                        <Marker position={[
                          hos.lognitude,
                          hos.latitude
                        ]}>
                          <Popup>
                            <h5>{hos.hospitalName}</h5>
                            <p>{hos.hospitalType}</p>
                          </Popup>
                        </Marker>
                      ))
                    }

                  </MapContainer>
                </div>
            }

          </Col>
          <Col>
            <Card>
              {
                spin ? <center><Spinner /></center> :
                  <Card.Body style={{ 'maxHeight': 'calc(100vh - 132px)', 'overflowY': 'auto' }}>
                    {
                      sortLocation.map(sort =>
                        <Card style={{ marginBottom: '10px' }}>
                          <Card.Body>
                            <Card.Title>{sort.hospitalName}</Card.Title>
                            <Card.Text style={{fontSize:'12px'}}><strong>Distance:</strong> {sort.distance} KM</Card.Text>
                            <Card.Text style={{fontSize:'12px'}}><strong>Address:</strong> {sort.address} KM</Card.Text>
                            <Button variant="success" size="sm" onClick={(id) => {
                              setTempHospitalId(sort.hospitalId)
                              handleConfirmShow()
                            }}>Book Bed</Button>

                            <Button variant="primary" size="sm" onClick={() => {
                              setTempHospitalId(sort.hospitalId);
                              handleShow()
                            }} style={{ marginLeft: '10px' }}>Show Wards</Button>

                            <Button variant="info" size="sm" onClick={() => {
                              setHosId(sort.hospitalId)
                              handleBedShow()
                            }} style={{ marginLeft: '10px' }}>Show Beds</Button>

                            <Button variant="warning" size="sm" onClick={() => {
                              setTempHospitalId(sort.hospitalId)
                              handleDocShow()
                            }} style={{ marginLeft: '10px' }}>Show Doctors</Button>
                          </Card.Body>
                        </Card>
                      )
                    }
                  </Card.Body>
              }
            </Card>

          </Col>
        </Row>
      </Container>

      <Modal
        show={showConfirm} onHide={handleConfirmClose}
        centered
      >
        <Modal.Body>
            <Container>
              <Row>
                <Col style={{textAlign:'center'}}><h2>Are you sure to book a bed ?</h2></Col>
              </Row>
              <hr/>
              <Row>
                <Col>
                  <Button className="mx-auto d-block" variant="success" onClick={()=>{
                    bookBed(tempHospitalId)
                    handleBookShow()
                    handleConfirmClose()
                    }}>Yes</Button>
                </Col>
                <Col>
                  <Button className="mx-auto d-block" variant="danger" onClick={handleConfirmClose}>No</Button>
                </Col>
              </Row>
            </Container>
        </Modal.Body>
      </Modal>




      <Modal
        show={showBook} onHide={handleBookClose}
        dialogClassName="my-modal"
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Hospital Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <h2>Your bed is on hold for <strong>2 Hours</strong></h2>
            <h3>Your OTP is: <strong>{tempOtp}</strong></h3>
            <h5 style={{ color: 'red' }}>Valid for 2 Hours only</h5>
            <h6>Otp also send to your phone no: {props.userDetails.contact}</h6>
          </center>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleBookClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show} onHide={handleClose}
        dialogClassName="my-modal"
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Ward's Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            spinWard ? <center><Spinner /></center>:

          <Table bordered hover>
            <tbody>
              <tr>
                <th><strong>Wards Name:</strong></th>
              </tr>
              {wardsById === null ? null :
               wardsById.length === 0 ? <center><h3>No Wards Found</h3></center> :
                wardsById.map(war =>
                  <tr>
                    <td>{war.wardsName}</td>
                  </tr>
                )

              }



            </tbody>
          </Table>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={showBed} onHide={handleBedClose}
        dialogClassName="my-modal"
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Avilable Beds</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            spinBed ? <center><Spinner /></center> :
              <center>
                <Table bordered hover>
                  <tbody>
                    {bedByHosId === null ? null :
                      bedByHosId.length === 0 ? <center><h3>No Beds Found</h3></center> :
                        bedByHosId.map(bed =>
                          <tr>
                            <td><strong>Ward Name:</strong> {bed.wardsName}</td>
                            <td><strong>PrivateBed:</strong> {bed.privateBeds}</td>
                            <td><strong>GeneralBed:</strong> {bed.generalBeds}</td>
                            <td><strong>Total Beds:</strong> {bed.privateBeds + bed.generalBeds}</td>
                          </tr>
                        )
                    }
                  </tbody>
                </Table>
              </center>
          }


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleBedClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={showDoc} onHide={handleDocClose}
        dialogClassName="my-modal"
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Avilable Doctors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            spinDoc ? <center><Spinner /></center> :
              <center>
                <Table bordered hover>
                  <tbody>
                    {docByHosId === null ? null :
                      docByHosId.length === 0 ? <center><h3>No Doctors Found</h3></center> :
                        docByHosId.map(doc =>
                          <tr>
                            <td><strong>Doctor Name:</strong> {doc.docName}</td>
                            <td><strong>Doctor Registration No:</strong> {doc.docReg}</td>
                            <td><strong>Doctor Specialization:</strong> {doc.docSp}</td>
                            <td><strong>Doctor's Ward:</strong> {doc.docWard}</td>

                          </tr>
                        )
                    }
                  </tbody>
                </Table>
              </center>
          }


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDocClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>




    </>
  )
}

export default MapWork;