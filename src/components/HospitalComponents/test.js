import React, {  useState} from 'react';
import {Card, Container, Row , Col ,Form, Button, Table} from 'react-bootstrap';


function HospitalDetails(){

const [fields, setFields] = useState([{ value: null }]);
const [docfields, docsetFields] = useState([{}]);

function handleChange(i, event) {
  const values = [...fields];
  values[i].value = event.target.value;
  setFields(values);
}


function handleDocChange1(j, events) {
    const Doc_values = [...docfields];
    Doc_values[j].docName = events.target.value;
    docsetFields(Doc_values);
  }

  function handleDocChange2(j, events) {
    const Doc_values = [...docfields];
    Doc_values[j].docReg = events.target.value;
    docsetFields(Doc_values);
  }

  function handleDocChange3(j, events) {
    const Doc_values = [...docfields];
    Doc_values[j].docSp = events.target.value;
    docsetFields(Doc_values);
  }

function handleAdd() {
  const values = [...fields];
  values.push({ value: null });
  setFields(values);
}
function handleDocAdd() {
    const Doc_values = [...docfields];
    Doc_values.push({});
    docsetFields(Doc_values);
  }

function handleRemove(i) {
  const values = [...fields];
  values.splice(i, 1);
  setFields(values);
}
function handleDocRemove(j) {
    const Doc_values = [...docfields];
    Doc_values.splice(j, 1);
    docsetFields(Doc_values);
  }
  
console.log("Wards:",fields)
console.log("Doctors",docfields)


function handleSubmit(event) {
  event.preventDefault();

        const dataNew = [
          {docName:"Arvind",docReg:"2588",docSp:"Fever"},
          {docName:"Shrikant",docReg:"5288",docSp:"Covid"},
          {docName:"Suyash",docReg:"1234",docSp:"Ass"}
        ]

        console.log("DataNew",dataNew)
        const requestBody = {
            query: `
            mutation {
              createHospitalDetails(id:"6040fbcbcae7d553dd4199fe",hospitalDetailsInput:{
                wards:["${fields.map(doc=>doc.value)}"]
                doctors:
                [{
                 docName:"${docfields.map(doc=>doc.docName)}"
                 docReg: "${docfields.map(doc=>doc.docReg)}"
                 docSp: "${docfields.map(doc=>doc.docSp)}"}
                ]
                  
                beds:{
                  privateBeds:55
                  generalBeds:85
                }
              }
            )
          
              {
                wards
                doctors{
                  docName
                  docReg
                  docSp
                } 
                beds {
                  privateBeds
                  generalBeds
                }
              }
            }
            `
        };



        fetch('http://localhost:4000/graphql',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

}

    return(
        
        <Container style={{ marginTop: '30px'}} >
        <Card style={{borderRadius:'30px 30px 30px 30px',backgroundColor:'ghostwhite'}}>
        <Card.Header style={{textAlign:'center',fontWeight:'700',borderRadius:'5px 5px 0 0px',fontSize:'1.6rem', backgroundColor:'#2980b9',color:'white',borderRadius:'30px 30px 0px 0px'}}>Hospital Details Filling</Card.Header>
            <Card.Body style={{marginTop:'-20px',marginBottom: '-150px'}}>
                <Row>

                    <Col md={10} style={{marginLeft:'5px', padding:'112px',borderRadius:'10px',justifyContent:'center'}}>
                    <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Wards: </Form.Label>
                  <Button type="button" onClick={() => handleAdd()} variant="primary">
                    +
                  </Button>
                  {fields.map((field, idx) => {
                return (
                  <div key={`${field}-${idx}`}>
                  <Form.Control 
                  type="text" 
                  placeholder="Enter Wards"
                  onChange={e => handleChange(idx, e)}
                   />
                    <Button type="button" onClick={() => handleRemove(idx)} variant="danger">
                      X
                    </Button>
                  </div>
                );
              })}
                </Form.Group>
        
              <h1>~~~~~~~~~~~~~~~~~~~~~~</h1>
        
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Doctors: </Form.Label>
                  <Button type="button" onClick={() => handleDocAdd()} variant="primary">
                    +
                  </Button>
                  {docfields.map((field, idx) => {
                return (
                  <div key={`${field}-${idx}`}>
                  <Form.Control 
                  type="text" 
                  placeholder="Enter Wards"
                 onChange={e => handleDocChange1(idx, e)}
                   />
        
                  <Form.Control 
                  type="text" 
                  placeholder="Enter Wards"
                 onChange={e => handleDocChange2(idx, e)}
                   />
        
                  <Form.Control 
                  type="text" 
                  placeholder="Enter Wards"
                  onChange={e => handleDocChange3(idx, e)}
                   />
                    <Button type="button" onClick={() => handleDocRemove(idx)} variant="danger">
                      X
                    </Button>
        
        
        
                 
                    
                  </div>
                  
                );
              })}
                </Form.Group>

                
              <h1>~~~~~~~~~~~~~~~~~~~~~~</h1>
        
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Beds: </Form.Label>
                  <br></br>
                  <Form.Label>Private Beds: </Form.Label>
                  <Form.Control type="text" placeholder="Enter Private Beds" />
                  <Form.Label>General Beds: </Form.Label>
                  <Form.Control type="text" placeholder="Enter General Beds" />
                  </Form.Group>
        
        
                 <center>
                <Button variant="primary" type="submit">
                  Submit
                </Button></center>
              </Form>
                   
                    </Col>
                </Row>
            </Card.Body>
        </Card>

     






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
                                    
                            fields.map(hos => 
                                       <tr>

                                            <td>{hos.value}</td>
                                            
                                        </tr>  
                                    )
                                }

                                {
                                    
                                    docfields.map(hos => 
                                               <tr>
        
                                                    <td>{hos.docName}</td>
                                                    <td>{hos.docReg}</td>
                                                    <td>{hos.docSp}</td>
                                                    
                                                </tr>  
                                            )
                                        }
                          </tbody>
                        </Table>










         </Container>



   

   
  );
    


}
export default HospitalDetails;


