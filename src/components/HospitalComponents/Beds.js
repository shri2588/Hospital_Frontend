import React, { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';


function Beds() {
  
  const HosTokenById = localStorage.getItem('hospitalIdByToken')
  const [allWards, setAllWards] = useState([])

  useEffect(() => {
    fetchWards()
  }, [])

  function fetchWards() {
    const requestWard = {
      query: `
           query {
            getWards{
              _id
              wardsName
              wardNo
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
      .then(res=> {
        if(res.status !==200 && res.status !== 201) {
            throw new Error ('Failed');
        }
        return res.json();
    })
        .then(resData => {
          const fetchWards = resData.data.getWards;
          setAllWards(fetchWards);
          console.log("Wards",fetchWards)
        })
        .catch(err => {
          console.log(err);
        });
    



  }


  let privateBeds = useRef(null)
  let generalBeds = useRef(null)
  let wardsName = useRef(null)


  const handleSubmit = (event) => {

    event.preventDefault();
    const PrivateBeds = privateBeds.current.value;
    const GeneralBeds = generalBeds.current.value;
    const WardsName = wardsName.current.value;


    console.log(
      PrivateBeds,
      GeneralBeds,
      WardsName
    )

    if (PrivateBeds !== '' && GeneralBeds !== '') {

      const requestBody = {
        query: `
        mutation{
           updateBeds(hospitalId:"${HosTokenById}", wardName:"${WardsName}", BedInput:{
            privateBeds:${PrivateBeds}
            generalBeds: ${GeneralBeds}
            wardsName:"${WardsName}"
          })
          {
            privateBeds
            generalBeds
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

      alert("Beds Entered Successfully.")
      event.target.reset();
    }
    else {
      alert("Enter Somthing.")
      event.target.reset();
    }

  };

  return (

    <>
      <h1>Beds</h1>


      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Wards Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter wards" as="select"
            ref={wardsName}
          >
            {
              allWards.map(ward =>
            <option>{ward.wardsName}</option>
              )
            }
          </Form.Control>

        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Private Beds:</Form.Label>
          <Form.Control type="text" placeholder="Enter Private Beds No" ref={privateBeds} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>General Beds:</Form.Label>
          <Form.Control type="text" placeholder="Enter General Beds No" ref={generalBeds} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enter
        </Button>
      </Form>
    </>

  );

}
export default Beds;


