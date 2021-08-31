import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';


function Wards() {
  const HosTokenById = localStorage.getItem('hospitalIdByToken')
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

    if(WardName !== '' && WardNo !== ''){
      const requestBody = {
        query: `
                mutation {
                  createWards(
                    id:"${HosTokenById}" ,
                      WardInput:
                      {
                        wardsName:"${WardName}"
                        wardNo:"${WardNo}"
                      }
                  )
                  
                  {
                    _id
                    wardsName
                    wardNo
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
  
      alert("Wards Entered Successfully.")
      event.target.reset();
    }
    else{
      alert("Enter Something.")
      event.target.reset();
    }
    


};

  return (

    <>
        <h1>Wards</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Ward Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter Ward Name" ref = {wardName}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Ward No:</Form.Label>
          <Form.Control type="text" placeholder="Enter Word No"  ref = {wardNo}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Enter
        </Button>
      </Form>
    </>

  );

}
export default Wards;


