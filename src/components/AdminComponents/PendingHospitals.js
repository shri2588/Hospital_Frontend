import { Button, Table, Modal} from 'react-bootstrap';
import {useEffect, React, useState, prevState}  from 'react';


function PendingHospitals() {

    //Model open
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Model close


    const [hospitalId, setHospitalId] = useState()

    const [hospitalIdConfirm, setHospitalIdConfirm] = useState(null)
    const [pendingHospital, setPendingHospitals] = useState(0)

    const [stateHospital, setHospitals] = useState([])

    const [stateSingleHospital, setSingleHospitals] = useState({})

    
  useEffect(() => {
    fetchPendingData()
  },[hospitalIdConfirm,pendingHospital])

  useEffect(() => {
    fetchSingleHospital()
},[hospitalId])




    
    function fetchPendingData(){
        const requestBody = {
            query: `
            query 
            {
                getPendingHospitals
                {
                    _id
                  hospitalName
                  hospitalRegistrationNo
                  hospitalType
                  ownerName
                  status
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
        })
        .then(res=> {
            if(res.status !==200 && res.status !== 201) {
                throw new Error ('Failed');
            }
            return res.json();
        })
        .then(resData => {
            //console.log(resData);
            const fetchPendingHospitals = resData.data.getPendingHospitals;
            setHospitals(fetchPendingHospitals);
            console.log("Fetch Pending",fetchPendingHospitals)
        })
        .catch(err => {
            console.log(err);
        });
    }


    function fetchSingleHospital(){
      const requestBody = {
          query: `
          query 
          {
            getSingleHospital(id:"${hospitalId}"){
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
              status
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
      })
      .then(res=> {
          if(res.status !==200 && res.status !== 201) {
              throw new Error ('Failed');
          }
          return res.json();
      })
      .then(resData => {
          //console.log(resData);
          const fetchSingleHospitals = resData.data.getSingleHospital;
          setSingleHospitals(fetchSingleHospitals);
          console.log(fetchSingleHospitals)
      })
      .catch(err => {
          console.log(err);
      });
  }
  

  function confirmHospital(e){
    const requestBody = {
        query: `
        mutation 
        {
          updateStatus(id:"${e}",status:"Active"){
            _id
            hospitalName
            status
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
    })
    .then(res=> {
      if(res.status !==200 && res.status !== 201) {
          throw new Error ('Failed');
      }
      return res.json();
  })
  .then(resData => {  
      const updateValue = resData.data.getPendingHospitals;
      setPendingHospitals(pendingHospital+1);
     console.log("Pending",resData);
  })
  .catch(err => {
      console.log(err);
  });
    console.log(e)
  
}


    return (

        <>
        <center><h2>All Active Hospitals</h2></center>
        <hr></hr>
                        <Table bordered hover>
                          <thead>
                            <tr>
                              <th>Hospital Name</th>
                              <th>Registration No</th>
                              <th>Type</th>
                              <th>Owner Name</th>
                              <th>Status</th>
                              <th>Show Details</th>
                              <th>Confirm</th>
                            </tr>
                          </thead>
                          <tbody>
                                  {
                                    
                                     stateHospital.map(hos => 
                                        <tr key={hos._id}>

                                             <td>{hos.hospitalName}</td>
                                             <td>{hos.hospitalRegistrationNo}</td>
                                             <td>{hos.hospitalType}</td>
                                             <td>{hos.ownerName}</td>
                                             <td>{hos.status}</td>
                                             <td><Button variant="warning" size="sm" onClick={()=>{setHospitalId(hos._id);
                                             handleShow()
                                             }}>Show Details</Button></td>
                                             
                                             <td><Button variant="primary" size="sm" onClick={(e)=> confirmHospital(hos._id)}>Confirm</Button></td>
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
          <Modal.Title>Hospital Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

              <Table bordered hover>
                          <tbody>
                                <tr>
                                  <td><strong>Hospital Name:</strong></td>
                                  <td>{stateSingleHospital.hospitalName}</td>
                                </tr>

                                <tr>
                                  <td><strong>Hospital Registration No:</strong></td>
                                  <td>{stateSingleHospital.hospitalRegistrationNo}</td>
                                </tr>

                                <tr>
                                  <td><strong>Hospital Type:</strong></td>
                                  <td>{stateSingleHospital.hospitalType}</td>
                                </tr>

                                <tr>
                                  <td><strong>Hospital Government:</strong></td>
                                  <td>{stateSingleHospital.government}</td>
                                </tr>

                                <tr>
                                  <td><strong>Hospital Address:</strong></td>
                                  <td>{stateSingleHospital.address}</td>
                                </tr>

                                <tr>
                                  <td><strong>Hospital State:</strong></td>
                                  <td>{stateSingleHospital.state}</td>
                                </tr>

                                <tr>
                                  <td><strong>Hospital District:</strong></td>
                                  <td>{stateSingleHospital.district}</td>
                                </tr>

                                <tr>
                                  <td><strong>Hospital Pincode:</strong></td>
                                  <td>{stateSingleHospital.pincode}</td>
                                </tr>

                                <tr>
                                  <td><strong>Hospital Website:</strong></td>
                                  <td><a href={stateSingleHospital.website}>{stateSingleHospital.website}</a></td>
                                </tr>
                                <tr>
                                  <td><strong>Owner Name:</strong></td>
                                  <td>{stateSingleHospital.ownerName}</td>
                                </tr>
                                <tr>
                                  <td><strong>Owner Contact:</strong></td>
                                  <td>{stateSingleHospital.ownerContactNo}</td>
                                </tr>
                                <tr>
                                  <td><strong>Owner Email:</strong></td>
                                  <td>{stateSingleHospital.ownerEmail}</td>
                                </tr>
                                <tr>
                                  <td><strong>Hospital Status:</strong></td>
                                  <td>{stateSingleHospital.status}</td>
                                </tr>
                          </tbody>
                        </Table>
                                 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
        </> 
        


  
    )
}

export default PendingHospitals;