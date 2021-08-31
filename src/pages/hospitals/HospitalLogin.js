import React, {useState, useRef} from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import NavbarMenu from '../../components/NavbarMenu';
import {Link, Redirect } from 'react-router-dom';

function HospitalLogin() {

    const [isLogin, setIsLogin] = useState(false);

    console.log(isLogin)
    let hosId = useRef(null)
    let password = useRef(null)

    const handleSubmit = (event) => {
        event.preventDefault();

        const HosId = hosId.current.value;
        const Password = password.current.value;

        if (HosId.trim().length === 0 || Password.trim().length === 0) {
            return;
        }

        console.log(HosId, password);

        const requestBody = {
            query: `
                query{
                    hospitalLogin(hosId: "${HosId}", password: "${Password}") {
                        hosId
                        hosToken
                        hosTokenExpiration
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
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json()
        })
            .then(resData => {
                console.log(resData)
                if (resData.data.hospitalLogin.hosToken) {
                    localStorage.setItem('hosId', resData.data.hospitalLogin.hosId)
                    localStorage.setItem('hosToken', resData.data.hospitalLogin.hosToken)
                    localStorage.setItem('hosTokenExpiration', resData.data.hospitalLogin.hosTokenExpiration)
                    setIsLogin(true)
                }
            }) 
            .catch(err => {
                console.log(err)
                alert("Registration No or password not correct!!!")
            })
    };

    if (isLogin) {
        return <Redirect to="/hospitalDashboard" />
    }
    return (
        <>
            <NavbarMenu />
            <Container style={{ marginTop: '30px' }} >
                <Card style={{ borderRadius: '30px 30px 30px 30px' }}>
                    <Card.Header style={{ textAlign: 'center', fontWeight: '700', borderRadius: '5px 5px 0 0px', fontSize: '1.6rem', backgroundColor: '#2980b9', color: 'white', borderRadius: '30px 30px 0px 0px' }}>Hospital Login</Card.Header>
                    <Card.Body style={{ marginTop: '-20px', marginBottom: '-20px' }}>
                        <Row>
                            <Col md={5} className="log_img">
                            </Col>
                            <Col md={7} style={{ marginLeft: '5px', padding: '112px', borderRadius: '10px' }}>
                                <Form  onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01" >
                                            <Form.Label>Hospital Registration No</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Login Id"
                                                ref={hosId}

                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                required
                                                type="password"
                                                placeholder="Enter Password"
                                                ref={password}
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <center>
                                        <Button type="submit" id="login-btn">
                                            Log In
                                        </Button>
                                    </center>
                                </Form>
                                <center>Don't have an account? <Link to="/hospital_register">Register here</Link></center>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            <br></br>
        </>
    )
}



export default HospitalLogin;
