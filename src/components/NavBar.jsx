import React, { useContext } from 'react'; 
import { Container, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// internal imports
import UserContext from '../context/UserContext';


function NavBar() {
    const { user } = useContext(UserContext); 
    const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary d-flex flex-row align-items-center p-3">
        <Navbar.Brand  href="/">Movie App</Navbar.Brand>
            <h6 className='float-end'>User: {user.name}</h6>
            <Button variant="outline-success" onClick={()=> navigate('/login')}>Login</Button>
    </Navbar>
  )
}

export default NavBar
