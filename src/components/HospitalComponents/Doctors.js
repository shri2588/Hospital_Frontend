import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';


function Doctors() {
  const HosTokenById = localStorage.getItem('hospitalIdByToken')
  let docName = useRef(null)
  let docReg = useRef(null)
  let docSp = useRef(null)
  let docWard = useRef(null)

  const handleSubmit = (event) => {

    event.preventDefault();
    const DocName = docName.current.value;
    const DocReg = docReg.current.value;
    const DocSp = docSp.current.value;
    const DocWard = docWard.current.value;
    
    
    console.log(
      DocName,
      DocReg,
      DocSp,
      DocWard
    )

    if(DocName !== '' && DocReg !== '' && DocSp !== '' && DocWard !== ''){
      const requestBody = {
        query: `
                mutation {
                  createDoctors(id:"${HosTokenById}",DoctorInput:{
                    docName:"${DocName}"
                    docReg:"${DocReg}"
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
  
  
  
      fetch('http://localhost:4000/graphql',{
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
              'Content-Type' : 'application/json'
          }
      });
  
      alert("Doctor Entered Successfully.")
      event.target.reset();
    }
    else{
      alert("Enter Some thing.")
      event.target.reset();
    }
    


};

  return (

    <>
        <h1>Doctors</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Doctor Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter Doctor Name" ref = {docName}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Doctor Registration No:</Form.Label>
          <Form.Control type="text" placeholder="Enter Doctor Registration No" ref = {docReg}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Doctor Specialization:</Form.Label>
          <Form.Control type="text" placeholder="Enter Doctor Specialization" ref = {docSp}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Doctor Ward No:</Form.Label>
          <Form.Control type="text" placeholder="Enter Doctor Ward No"  ref = {docWard}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Enter
        </Button>
      </Form>
    </>

  );

}
export default Doctors;


