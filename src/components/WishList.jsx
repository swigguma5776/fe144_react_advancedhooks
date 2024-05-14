import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// internal imports
import { deleteItem } from '../features/wishListSlice';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import NavBar from './NavBar';

function WishList() {
    const dispatch = useDispatch();
    
    
    let { wishList } = useSelector(state => state.wishList) //this grabs the current state of our wishList
    console.log(wishList)
        // setMovieList(wishList)
        
   
    
    const handleDelete = (id) => {
        dispatch(deleteItem( id ));
       
    }

    return (
        <Container fluid className='px-0'>
            <NavBar />
            <Row className='p-3'>
                {wishList.map(movie => (
                    <Col key={movie.id} xs={12} sm={6} md={4} >
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={movie.poster_path} />
                            <Card.Body>
                                <Card.Title>{movie.original_title}</Card.Title>
                                <Card.Text>
                                    {movie.overview}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleDelete(movie.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default WishList
