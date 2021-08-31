import React, { useEffect,useState } from 'react';
import {Card, Container, Row , Col ,Form, Button, Table} from 'react-bootstrap';

function HospitalDataShow() {
    const HosTokenById = localStorage.getItem('hospitalIdByToken')
    
    const [stateHospitalData, setHospitalsData] = useState([])

        
  useEffect(() => {
    fetchHospitalData()
  },[])


    function fetchHospitalData(){
        const requestBody = {
            query: `
            query 
            {
                getHospitalDetails{
                    wards
                    doctors{
                      docName
                      docReg
                      docSp
                    }
                    beds{
                      privateBeds
                      generalBeds
                    }
                    
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
            const fetchHospitalsData = resData.data.getHospitalDetails;
            setHospitalsData(fetchHospitalsData);
            console.log("Fetch Pending",fetchHospitalsData)
        })
        .catch(err => {
            console.log(err);
        });
    }
    let det = stateHospitalData.map(doc => 
        JSON.stringify(doc.beds)
    )

    console.log("det",det)

    return(
        <div>
        {
            stateHospitalData.map(doc => 
        JSON.stringify(doc.beds)
    )
        }
        </div>
    )
}

export default HospitalDataShow;