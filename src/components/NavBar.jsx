import React, { useContext } from 'react'; 
import { Container, Navbar, Button, Nav, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { EmojiKissFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

// internal imports
import UserContext from '../context/UserContext';


function NavBar() {
    const { user } = useContext(UserContext); 
    const navigate = useNavigate();
    const { totalItems } = useSelector( (state) => state.wishList )
    console.log(totalItems)
  return (
    <Navbar expand="lg" className="bg-info d-flex flex-row align-items-center justify-content-between px-3">
        <Navbar.Brand  href="/">Movie App</Navbar.Brand>
            <Nav className='d-flex flex-row align-items-center justify-content-between'>
              <Container onClick={()=> navigate('/wish-list')}>
                <EmojiKissFill color='white'></EmojiKissFill>
                <Badge bg="secondary">{totalItems}</Badge>
              </Container>
              <h6 className='mx-3 mt-2'>User: {user.name}</h6>
              <Button variant="outline-success" onClick={()=> navigate('/login')}>Login</Button>
            </Nav>
    </Navbar>
  )
}

export default NavBar
