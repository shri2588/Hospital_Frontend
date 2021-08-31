import { Button, Table, Modal, Form } from 'react-bootstrap';
import { useEffect, React, useState, useRef } from 'react';


function DisplayWards() {

  const HosTokenById = localStorage.getItem('hospitalIdByToken')
  
  //Model open
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Model close

  const [stateWards, setWards] = useState([])
  const [wardId, setWardId] = useState()
  const [wardDeleted, setWardDeleted] = useState()
  const [wardOwnData, setWardOwnData] = useState({})



  useEffect(() => {
    fetchWardsData()
  },[])

  useEffect(() => {
    fetchWardsOwnData()
  }, [wardId])






  function fetchWardsData() {
    const requestBody = {
      query: `
            query 
            {
              getWardsByHosId(hospitalId:"${HosTokenById}")
              {
                _id
                wardsName
                wardNo
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
        const fetchWards = resData.data.getWardsByHosId;
        setWards(fetchWards);
        console.log(fetchWards)
      })
      .catch(err => {
        console.log(err);
      });
  }

  function fetchWardsOwnData() {
    const requestBodyForWardsOwnData = {
      query: `
            query 
            {
              getWardsByOwnId(id:"${wardId}"){
                wardsName
                wardNo
              }
              }
            `
    };



    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBodyForWardsOwnData),
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
        const fetchOwnWards = resData.data.getWardsByOwnId;
        setWardOwnData(fetchOwnWards);
        console.log(fetchOwnWards)
      })
      .catch(err => {
        console.log(err);
      });
  }
  let wardName = useRef(null)
  let wardNo = useRef(null)

  const handleSubmit = (event) => {

    event.preventDefault();
    const WardName = wardName.current.value;
    const WardNo = wardNo.current.value;


    console.log(
      WardName,
      WardNo
    )

    if (WardName !== '' && WardNo !== '') {
      const requestBody = {
        query: `
                mutation {
                  editWards(wardId:"${wardId}", WardInput:{
                    wardsName:"${WardName}"
                    wardNo:"${WardNo}"
                  })
                    {
                      _id
                      wardsName
                      wardNo
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
      });

      alert("Wards Updated Successfully.")
      event.target.reset();
    }
    else {
      alert("Enter Something.")
      event.target.reset();
    }

  };

  function deleteWard(e) {
    const requestDeleteBody = {
      query: `
      mutation{
        deleteWards(wardId:"${e}"){
          wardsName
        }
      }
          `
    };

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestDeleteBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(()=> setWardDeleted(true))
    alert('Wards Deleted')
  }

  //let ownWardName = wardOwnData.map(wardOwn => wardOwn.wardsName)


  return (

    <div>
      <center><h2><u>All Wards in Hospital</u></h2></center>
      <hr></hr>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Ward Name</th>
            <th>Ward No</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            stateWards.map(war =>
              <tr key={war._id}>

                <td>{war.wardsName}</td>
                <td>{war.wardNo}</td>
                <td><Button variant="warning" size="sm" onClick={() => {
                  setWardId(war._id);
                  handleShow()
                }}>Edit</Button></td>
                <td><Button variant="danger" size="sm" onClick={() =>deleteWard(war._id) } 
                >Delete</Button></td>
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
          <Modal.Title>Edit Wards</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Ward Name:</Form.Label>

              <Form.Control type="text" ref={wardName} Value={wardOwnData === null ? null : wardOwnData.wardsName} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Ward No:</Form.Label>
              <Form.Control type="text" ref={wardNo} Value={wardOwnData === null ? null : wardOwnData.wardNo} />
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