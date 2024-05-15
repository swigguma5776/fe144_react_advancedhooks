import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, 
        Card, 
        Button, 
        Row, 
        Col, 
        Modal, 
        FloatingLabel,
        Form } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// internal imports
import { deleteItem } from '../features/wishListSlice';
import NavBar from './NavBar';

function MovieList({ listType }) {
    const [open, setOpen] = useState(false);
    const [review, setReview] = useState("");
    const [movies, setMovies] = useState([]);
    const [id, setId] = useState(null);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    
    let { watchList } = useSelector(state => state.watchList)
    let { wishList } = useSelector(state => state.wishList) //this grabs the current state of our wishList
    
    console.log(open)
    
    useEffect(()=> {
        console.log('in the useEffect')
        if (listType === 'watch') {
            setMovies(watchList)
            }else {
                setMovies(wishList)
            }
    },[])
        
   
    
    const handleDelete = (id) => {
        listType == 'wish' && dispatch(deleteItem( id ));
       
    }
    
    const postReview = async () => {
        const response = await axios.put(
            `http://127.0.0.1:5000/watchlist/${id}`,
            review, // Pass data directly, no need for JSON.stringify
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        return response;
        
    }
    
    const {mutate, isLoading, isError, error} = useMutation({
        mutationFn: postReview,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['reviews'])
            alert('Successfully added review to', data.id)
        }
    })
    
    const handleSubmit = (event) => {
        event.preventDefault();
        mutate();
    }
    

    return (
        <Container fluid className='px-0'>
            <NavBar />
            <Row className='p-3'>
                {movies.map(movie => (
                    <Col key={movie.id} xs={12} sm={6} md={4} >
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={movie.poster_path} />
                            <Card.Body>
                                <Card.Title>{movie.original_title}</Card.Title>
                                <Card.Text>
                                    {movie.overview}
                                </Card.Text>
                                {movie.review || listType === 'watch' &&
                                    <div>
                                        <Card.Text>{movie.review}</Card.Text>
                                        <Button onClick={()=> {setOpen(true); setId(movie.id)} }>Add Review</Button>
                                    </div>
                                }
                                <Button variant="primary" onClick={() => handleDelete(movie.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {open &&
            <Modal
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add a Review
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className='w-100 p-4 border rounded mt-5'>
                        <FloatingLabel controlId="Review" label="Review">
                            <Form.Control 
                                type="text" 
                                placeholder="Review"  
                                onChange={ (event)=> setReview(event.target.value)} />
                        </FloatingLabel>
                        <Button variant='outline-info' type='submit' className='mt-4'>Submit</Button>
                    </Form>
                </Modal.Body>
                <Button variant='danger' onClick={()=> setOpen(false)}>Cancel</Button>
            </Modal>
            }
        </Container>
    )
}

export default MovieList;
