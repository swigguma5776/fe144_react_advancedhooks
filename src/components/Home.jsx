import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';

// internal imports
import UserContext from '../context/UserContext';
import NavBar from './NavBar';
import MovieData from './MovieData';
import Search from './Search'; 

function Home() {
    // setup our useContext hook
    const { user } = useContext(UserContext); 
    console.log(user)
    
    
  return (
    <Container fluid className='px-0'>
        <NavBar />
        <Container className='p-3'>
        {!user.isLoggedIn ? <h1>Must be logged in first</h1> :
            <Container>
                <h1>Welcome, {user.name}</h1>
                <p>You are now {user.isLoggedIn ? 'logged in' : 'logged out'}</p>
                <h3>Your Recommended Movie: </h3>
                <MovieData />
                <Search />
            </Container>
        }
        </Container>
    </Container>
  )
}

export default Home
