import {React} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import Sidebar from '../../components/AdminComponents/Sidebar'
import {Redirect, useHistory} from 'react-router-dom';
import NavbarMenu from '../../components/NavbarMenu'
import jwt from 'jsonwebtoken'

function AdminDashboard() {
    const history = useHistory()
    const AdminToken = localStorage.getItem('token')

      if(!AdminToken){
        return <Redirect to = "/admin_login" />
    }

    jwt.verify(AdminToken, 'superAdminSecretKey', function(err, decoded) {
        if (err) {
            history.push("/logout")    
        }
      });

      var decoded = jwt.verify(AdminToken, 'superAdminSecretKey');
        return (
            <>
            <NavbarMenu />
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{textAlign:'center',marginTop:'30px'}}>Admin Dashboard</h1>
                            <h3 style={{textAlign:'center',marginTop:'30px'}}>Welcome <strong>{decoded.loginId}</strong></h3>
                        </Col>
                    </Row>
                </Container>
    
                <Container fluid>
    
                    <Sidebar />
    
                </Container>
            </>
        )
    }



export default AdminDashboard;