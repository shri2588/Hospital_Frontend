import { Button, Table, Form, Modal } from 'react-bootstrap';
import { useEffect, React, useState, useRef } from 'react';


function DisplayBeds() {

  const HosTokenById = localStorage.getItem('hospitalIdByToken')

  //Model open
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //Model close

  const [stateBeds, setBeds] = useState([])
  const [bedId, setBedId] = useState()
  const [bedOwnData, setBedOwnData] = useState({})


  useEffect(() => {
    fetchBedsData()
  }, [])

  useEffect(() => {
    fetchOwnBedData()
  }, [bedId])

  function fetchBedsData() {
    const requestBody = {
      query: `
            query 
            {
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
        //console.log(resData);
        const fetchBeds = resData.data.getBedsByHosId;
        setBeds(fetchBeds);
        console.log(fetchBeds)
      })
      .catch(err => {
        console.log(err);
      });
  }

  function fetchOwnBedData() {
    const requestOwnBody = {
      query: `
            query 
            {
              getBedsByOwnId(id:"${bedId}"){
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
        const fetchOwnBedData = resData.data.getBedsByOwnId;
        setBedOwnData(fetchOwnBedData);
        console.log("OWN", fetchOwnBedData)
      })
      .catch(err => {
        console.log(err);
      });
  }




  let totalPrivate = 0
  stateBeds.map(pri => {
    totalPrivate = totalPrivate + pri.privateBeds
  })

  let totalGeneral = 0
  stateBeds.map(gen => {
    totalGeneral = totalGeneral + gen.generalBeds
  })

  let totalHospitalBeds = totalPrivate + totalGeneral

  let bplBeds = ((totalHospitalBeds * 30) / 100).toFixed(0)

  console.log(totalPrivate)
  console.log(totalGeneral)
  console.log(totalHospitalBeds)
  console.log(bplBeds)





  let privateBed = useRef(null)
  let generalBed = useRef(null)
  let wardName = useRef(null)

  const handleSubmit = (event) => {

    event.preventDefault();
    const PrivateBed = privateBed.current.value;
    const GeneralBed = generalBed.current.value;
    const WardName = wardName.current.value;


    if (PrivateBed !== '' && GeneralBed !== '' && WardName !== '') {
      const requestEditBody = {
        query: `
        mutation 
        {
            editBeds(bedId:"${bedId}",BedInput:{
              privateBeds:${PrivateBed}
              generalBeds:${GeneralBed}
              wardsName:"${WardName}"
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



      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestEditBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      alert("Bed Updated Successfully.")
      event.target.reset();

    }
    else {
      alert("Enter Something.")
      event.target.reset();
    }

  };





  function deleteBed(e) {
    const requestDeleteBody = {
      query: `
        mutation{
          deleteBed(bedId:"${e}"){
            _id
            privateBeds
            generalBeds
            wardsName
          }
        }    `
    };

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestDeleteBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    alert('Bed Deleted')
  }


  return (

    <div>
      <center><h2><u>All Beds in Hospital</u></h2></center>
      <hr></hr>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Private Beds</th>
            <th>General Beds</th>
            <th>Ward Name</th>
            <th>Edit</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
          {

            stateBeds.map(bed =>
              <tr key={bed._id}>
                <td>{bed.privateBeds}</td>
                <td>{bed.generalBeds}</td>
                <td>{bed.wardsName}</td>
                <td><Button variant="warning" size="sm"onClick={() => {
                  setBedId(bed._id)
                  handleShow()
                }}>Edit</Button></td>
                <td><Button variant="danger" size="sm" onClick={() => deleteBed(bed._id)}>Delete</Button></td>
              </tr>
            )
          }
        </tbody>
      </Table>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Total Private Beds</th>
            <th>Total General Beds</th>
            <th>Total Beds In Hospital</th>
            <th>BPL Beds In Hospital</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalPrivate}</td>
            <td>{totalGeneral}</td>
            <td>{totalHospitalBeds}</td>
            <td>{bplBeds}</td>
          </tr>
        </tbody>
      </Table>





      <Modal
        show={show} onHide={handleClose}
        dialogClassName="my-modal"
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Bed</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Doctor's Name:</Form.Label>

              <Form.Control type="text" ref={privateBed} Value={bedOwnData === null ? null : bedOwnData.privateBeds} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Doctor's Registration No:</Form.Label>
              <Form.Control type="text" ref={generalBed} Value={bedOwnData === null ? null : bedOwnData.generalBeds} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Doctor's Specialization:</Form.Label>
              <Form.Control type="text" ref={wardName} Value={bedOwnData === null ? null : bedOwnData.wardsName} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
         </Button>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>




  )
}

export default DisplayBeds;