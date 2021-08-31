import { React, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../../components/HospitalComponents/Sidebar'
import NavbarMenu from '../../components/NavbarMenu';
import HospitalNotConfirm from '../../components/HospitalComponents/HospitalNotConfirm';
import { Redirect, useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken'

function HospitalDashboard() {

    const history = useHistory()
    const HosToken = localStorage.getItem('hosToken')
    const [hospitalById, setHospitalById] = useState({});

    useEffect(() => {
        fetchSingleHospital()
    }, [])

    if (!HosToken) {
        return <Redirect to="/hospital_login" />
    }

    jwt.verify(HosToken, 'hospitalSecretKey', function (err, decoded) {
        if (err) {
            history.push("/hospitalLogout")
        }
    });

    var decoded = jwt.verify(HosToken, 'hospitalSecretKey');
    if (decoded) {
        localStorage.setItem('hospitalIdByToken', decoded.hosUserId)
    }
    const HosTokenById = localStorage.getItem('hospitalIdByToken')


    function fetchSingleHospital() {
        const requestBody = {
            query: `
           query {
                getSingleHospital(id:"${HosTokenById}"){
                    _id
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
                const fetchHospital = resData.data.getSingleHospital;
                setHospitalById(fetchHospital);
                console.log("Hospital", fetchHospital)
            })
            .catch(err => {
                console.log(err);
            })

    }

    console.log(hospitalById.status)
    return (
        <>
            <NavbarMenu />
            <Container>
                <Row>
                    <Col>
                        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Hospital Dashboard</h1>
                    </Col>
                </Row>
            </Container>

            <Container fluid>
            {
                hospitalById.status === "Pending" ? <HospitalNotConfirm /> : <Sidebar />
            }
            </Container>
        </>
    )
}


export default HospitalDashboard;