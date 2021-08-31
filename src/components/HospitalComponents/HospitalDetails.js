import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Wards from './Wards'
import Doctors from './Doctors'
import Beds from './Beds'

function HospitalDetails() {
    return(

        <Container style={{padding:'50px'}}>
            <Row>
                <Col style={{borderRight: 'solid'}}><Wards /></Col>
                <Col style={{borderRight: 'solid'}}><Doctors /></Col>
                <Col><Beds /></Col>
            </Row>
        </Container>

    )
}

export default HospitalDetails;
