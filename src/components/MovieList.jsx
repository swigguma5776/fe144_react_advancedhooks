import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import axios from 'axios'; 

// internal imports
import { deleteItem } from '../features/wishListSlice';
import NavBar from './NavBar';
import { postToWatchList } from '../features/watchListSlice';

function MovieList({ listType }) {
    const [open, setOpen] = useState(false);
    const [review, setReview] = useState("");
    const [movies, setMovies] = useState([]);
    const [id, setId] = useState(null);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    // use the useMemo whenever you have expensive functions that return values.
    // will only run when the dependencies updates, not on every re-rende
    
    let { watchList } = useSelector(state => state.watchList)
    let { wishList } = useSelector(state => state.wishList) //this grabs the current state of our wishList
    
    
    useEffect(()=> {
        if (listType === 'watch') {
            setMovies(watchList)
            }else {
                setMovies(wishList)
            }
    },[])
    
    
    
    const avgPopularity = useMemo(() => {
        let avgPopularity = 0
        console.log(movies)
        if (movies.length !== 0){
            let popularityList = movies.map((movie) => movie.popularity )
            avgPopularity = Math.round(popularityList.reduce((acc, curr) => acc + curr) / popularityList.length)
        }
        return avgPopularity
    }, [movies])
        
   
    
    const handleDelete = useCallback((id) => {
        listType == 'wish' && dispatch(deleteItem( id ))
    },[dispatch, id]);
       
    
    
    const postReview = async () => {
        console.log({ review }, id)
        // dispatch(postToWatchList({ review }, id))
        const response = await axios.put(
                `http://127.0.0.1:5000/watchlist/${id}`,
                { review }, // Pass data directly, no need for JSON.stringify
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        
        const responseGet = await axios.get('http://127.0.0.1:5000/watchlist')
        console.log(responseGet)
        setMovies(responseGet.data)
    }
    
    const {mutate, isLoading, isError, error, isSuccess} = useMutation({
        mutationFn: postReview,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['reviews'])
            alert('Successfully added review to', data.id)
        }
    })
    
    const handleSubmit = (event) => {
        event.preventDefault();
        mutate();
        setOpen(false)
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
                                        <Card.Text>Review: {movie.review}</Card.Text>
                                        <Button onClick={()=> {setOpen(true); setId(movie.id)} }>Add Review</Button>
                                    </div>
                                }
                                <Button variant="primary" onClick={() => handleDelete(movie.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={open}
            >
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add a Review
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className='w-100 p-4'>
                        <FloatingLabel controlId="Review" label="Review">
                            <Form.Control 
                                type="text" 
                                placeholder="Review"  
                                onChange={ (event)=> setReview(event.target.value)} />
                        </FloatingLabel>
                        <Button variant='outline-info' type='submit' className='mt-4'>Submit</Button>
                        <Button className='ms-3 mt-4'variant='danger' onClick={()=> setOpen(false)}>Cancel</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default React.memo(MovieList);
