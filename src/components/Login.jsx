import React, { useState, useContext } from 'react';
import { Container, Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// internal imports
import UserContext from '../context/UserContext';
import NavBar from './NavBar';

function Login() {
    //setting up our hooks
    const [username, setUsername] = useState('');
    const { setUser } = useContext(UserContext); 
    const navigate = useNavigate(); 
    
    const handleSubmit = (event) => {
        event.preventDefault();
        sessionStorage.setItem('user', JSON.stringify({name: username, isLoggedIn: true }))
        setUser({name: username, isLoggedIn: true })
        navigate('/')
    }
  return (
    <Container fluid className='vh-100 p-0'>
        <NavBar />
        <Row className='h-50 my-auto w-100 justify-content-center'>
            <Col xs={9} sm={6} className=''>
                <Form onSubmit={handleSubmit} className='w-100 p-4 border rounded mt-5'>
                    <FloatingLabel controlId="userName" label="User Name">
                        <Form.Control 
                            type="text" 
                            placeholder="User Name" 
                            value={username} 
                            onChange={ (event)=> setUsername(event.target.value)} />
                    </FloatingLabel>
                    <Button variant='outline-info' type='submit' className='mt-4'>Login</Button>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default React.memo(Login);
