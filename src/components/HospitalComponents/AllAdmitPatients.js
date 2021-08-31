import React, { useState, useEffect } from 'react'
import { Button, Table, Modal } from 'react-bootstrap';

function AllAdmitPatients() {

    const HosTokenById = localStorage.getItem('hospitalIdByToken')

    const [allAdmitPatients, setAllAdmitPatients] = useState([]);
    const [bedById, setBedById] = useState({});
    const [bedIdstate, setBedId] = useState('');
    const [bedTypeState, setBedType] = useState('');
    const [patientId, setPatientId] = useState();
    const [admitPatientById, setAdmitPatientById] = useState({});

    const [skip, setSkip] = useState(false)
    const [runDischarge, setRunDischarge] = useState(false)
    const [runDelete, setRunDelete] = useState(false)

    

    useEffect(() => {
        fetchAdmitPatients()
    }, [runDelete])


    useEffect(() => {
        if (skip === true) {
            updateBedByBedId()
            fetchAdmitPatientsByOwnId()
        }
    }, [skip])


    useEffect(() => {
        if (runDischarge === true) {
            fetchDischargePatient()
        }
    }, [runDischarge])

    useEffect(() => {
        if (runDelete === true) {
            fetchDeleteAdmitPatient()
        }
    }, [runDelete])

    //All Admit Patients
    function fetchAdmitPatients() {
        const requestAdmitPatientsBody = {
            query: `
          query 
          {
            getAllAdmitPatient(hospitalId:"${HosTokenById}"){
                    _id
                    hospitalId
                    bedId
                    fname
                    lname
                    aadharNo
                    contactNo
                    email
                    dob
                    gender
                    marital
                    disease
                    age
                    address
                    state
                    district
                    city
                    pincode
                    ward
                    bedtype
                }
            }
          `
        };



        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestAdmitPatientsBody),
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
                const fetchAdmitPatients = resData.data.getAllAdmitPatient;
                setAllAdmitPatients(fetchAdmitPatients);
            })
            .catch(err => {
                console.log(err);
            })
    }

    //fetch bed by id
    function fetchBedsById(bedI) {

        const requestBedByIdBody = {
            query: `
            query 
            {
                getBedsByOwnId(id:"${bedI}"){
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
            body: JSON.stringify(requestBedByIdBody),
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
                const fetchBedById = resData.data.getBedsByOwnId;
                setBedById(fetchBedById);

                setSkip(true)
            })
            .catch(err => {
                console.log(err);
            })


    }




    let OldprivateBed = (bedById.privateBeds)
    let OldgeneralBed = (bedById.generalBeds)
    let updatedPrivate = OldprivateBed + 1
    let updatedGeneral = OldgeneralBed + 1


    function updateBedByBedId() {

        if (bedTypeState === "General Beds") {
            const requestUpdateGeneralBedBody = {
                query: `
                mutation {
                    updateAdmitBedPlus(bedId:"${bedIdstate}",BedInput:{
                        privateBeds:${OldprivateBed}
                        generalBeds:${updatedGeneral}
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
                body: JSON.stringify(requestUpdateGeneralBedBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        throw new Error('Failed');
                    }
                    alert(" General Bed Successfully!!!");

                    let OldprivateBed = ''
                    let OldgeneralBed = ''
                    let updatedPrivate = ''
                    let updatedGeneral = ''
                    setSkip(false)
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            const requestUpdatePrivateBedBody = {
                query: `
                mutation {
                    updateAdmitBedPlus(bedId:"${bedIdstate}",BedInput:{
                        privateBeds:${updatedPrivate}
                        generalBeds:${OldgeneralBed}
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
                body: JSON.stringify(requestUpdatePrivateBedBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        throw new Error('Failed');
                    }
                    alert(" Private Bed Successfully!!!");
                    let OldprivateBed = ''
                    let OldgeneralBed = ''
                    let updatedPrivate = ''
                    let updatedGeneral = ''
                    setSkip(false)

                })
                .catch(err => {
                    console.log(err);
                });
        }



    }



 //All Admit Patients
 function fetchAdmitPatientsByOwnId() {
    const requestAdmitPatientsBody = {
        query: `
      query 
      {
        getAdmitPatientByOwnId(id:"${patientId}"){
                _id
                hospitalId
                bedId
                fname
                lname
                aadharNo
                contactNo
                email
                dob
                gender
                marital
                disease
                age
                address
                state
                district
                city
                pincode
                ward
                bedtype
            }
        }
      `
    };



    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestAdmitPatientsBody),
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
            const fetchAdmitPatients = resData.data.getAdmitPatientByOwnId;
            setAdmitPatientById(fetchAdmitPatients);
            setRunDischarge(true)
        })
        .catch(err => {
            console.log(err);
        })
}


//save discharge data

function fetchDischargePatient() {
    const requestDischargeBody = {
        query: `
        mutation{
            createPatientDischarge(hospitalId:"${admitPatientById.hospitalId}",bedId:"${admitPatientById.bedId}",input:{
             fname:"${admitPatientById.fname}"
             lname:"${admitPatientById.lname}"
             aadharNo:"${admitPatientById.aadharNo}"
             contactNo:"${admitPatientById.contactNo}"
             email:"${admitPatientById.email}"
             dob:"${admitPatientById.dob}"
             gender:"${admitPatientById.gender}"
             marital:"${admitPatientById.marital}"
             disease:"${admitPatientById.disease}"
             age:${admitPatientById.age}
             address:"${admitPatientById.address}"
             state:"${admitPatientById.state}"
             district:"${admitPatientById.district}"
             city:"${admitPatientById.city}"
             pincode:"${admitPatientById.pincode}"
             ward:"${admitPatientById.ward}"
             bedtype:"${admitPatientById.bedtype}"
           })
             {
               _id
               hospitalId
               bedId
               fname
               lname
               aadharNo
               contactNo
               email
               dob
               gender
               marital
               disease
               age
               address
               state
               district
               city
               pincode
               ward
               bedtype
             }
           }
      `
    };



    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestDischargeBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            alert(" Discgarge!!!");
            setRunDelete(true)
            setRunDischarge(false)
        })
        .catch(err => {
            console.log(err);
        })
}

    



//delete admit patient data

function fetchDeleteAdmitPatient() {
    const requestDeleteBody = {
        query: `
        mutation{
            deleteAdmitPatient(patientId:"${patientId}"){
                _id
                fname
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
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            alert(" Deleted!!!");
            setRunDelete(false)
        })
        .catch(err => {
            console.log(err);
        })
}

console.log('skip',skip)
console.log('runDischarge',runDischarge)
console.log('rundelete', runDelete)

    return (
        <div>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Patient Full Name</th>
                        <th>Aadhar No</th>
                        <th>Contact</th>
                        <th>Ward Name</th>
                        <th>Bed Type</th>
                        <th>Discharge</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allAdmitPatients.map(pat =>
                            <tr key={pat._id}>

                                <td>{pat.fname} {pat.lname}</td>
                                <td>{pat.aadharNo}</td>
                                <td>{pat.contactNo}</td>
                                <td>{pat.ward}</td>
                                <td>{pat.bedtype}</td>
                                <td><Button variant="warning" size="sm" onClick={() => {
                                    setPatientId(pat._id)
                                    setBedId(pat.bedId)
                                    setBedType(pat.bedtype)
                                    fetchBedsById(pat.bedId)
                                }

                                }>Discharge</Button></td>
                            </tr>

                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default AllAdmitPatients;
