import { Button, Table, Form, Modal } from 'react-bootstrap';
import { useEffect, React, useState, useRef } from 'react';


function DisplayWards() {
  const HosTokenById = localStorage.getItem('hospitalIdByToken')
  //Model open
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //Model close


  const [stateDoctors, setDoctors] = useState([])
  const [doctorId, setDoctorId] = useState([])
  const [doctorOwnData, setDoctorOwnData] = useState({})



  useEffect(() => {
    fetchDoctorsData()
  }, [])

  useEffect(() => {
    fetchOwnDoctorData()
  }, [doctorId])




  function fetchDoctorsData() {
    const requestBody = {
      query: `
            query 
            {
              getDoctorsByHosId(hospitalId:"${HosTokenById}"){
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
        const fetchDoctors = resData.data.getDoctorsByHosId;
        setDoctors(fetchDoctors);
        console.log(fetchDoctors)
      })
      .catch(err => {
        console.log(err);
      });
  }


  function fetchOwnDoctorData() {
    const requestOwnBody = {
      query: `
            query 
            {
              getDoctorsByOwnId(id:"${doctorId}"){
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
        const fetchOwnDoctorData = resData.data.getDoctorsByOwnId;
        setDoctorOwnData(fetchOwnDoctorData);
        console.log("OWN", fetchOwnDoctorData)
      })
      .catch(err => {
        console.log(err);
      });
  }



  let docName = useRef(null)
  let docRegNo = useRef(null)
  let docSp = useRef(null)
  let docWard = useRef(null)

  const handleSubmit = (event) => {

    event.preventDefault();
    const DocName = docName.current.value;
    const DocRegNo = docRegNo.current.value;
    const DocSp = docSp.current.value;
    const DocWard = docWard.current.value;


    if (DocName !== '' && DocRegNo !== '' && DocSp !== '' && DocWard !== '') {
      const requestEditBody = {
        query: `
        mutation 
        {
          editDoctors(docId:"${doctorId}", DoctorInput:{
            docName:"${DocName}"
            docReg:"${DocRegNo}"
            docSp:"${DocSp}"
            docWard:"${DocWard}"
          })
          {
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
        body: JSON.stringify(requestEditBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      alert("Doctor Updated Successfully.")
      event.target.reset();

    }
    else {
      alert("Enter Something.")
      event.target.reset();
    }

  };


  function deleteDoctor(e) {
    const requestDeleteBody = {
      query: `
        mutation{
          deleteDoctor(docId:"${e}"){
            docName
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
  }


  return (

    <div>
      <center><h2><u>All Docotrs in Hospital</u></h2></center>
      <hr></hr>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Doctor Registration No</th>
            <th>Doctor Specialization</th>
            <th>Doctor's Ward</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            stateDoctors.map(doc =>
              <tr key={doc._id}>

                <td>{doc.docName}</td>
                <td>{doc.docReg}</td>
                <td>{doc.docSp}</td>
                <td>{doc.docWard}</td>
                <td><Button variant="warning" size="sm" onClick={() => {
                  setDoctorId(doc._id)
                  handleShow()
                }}>Edit</Button></td>
                <td><Button variant="danger" size="sm" onClick={() => deleteDoctor(doc._id)}>Delete</Button></td>
              </tr>
            )
          }
        </tbody>
      </Table>

      <Modal
        show={show} onHide={handleClose}
        dialogClassName="my-modal"
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Doctor's Name:</Form.Label>

              <Form.Control type="text" ref={docName} Value={doctorOwnData === null ? null : doctorOwnData.docName} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Doctor's Registration No:</Form.Label>
              <Form.Control type="text" ref={docRegNo} Value={doctorOwnData === null ? null : doctorOwnData.docReg} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Doctor's Specialization:</Form.Label>
              <Form.Control type="text" ref={docSp} Value={doctorOwnData === null ? null : doctorOwnData.docSp} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Doctor's Ward:</Form.Label>
              <Form.Control type="text" ref={docWard} Value={doctorOwnData === null ? null : doctorOwnData.docWard} />
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

export default DisplayWards;