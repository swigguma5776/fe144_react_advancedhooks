import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, 
        Row, 
        Col, 
        Form, 
        Button, 
        Spinner, 
        Modal,
        FloatingLabel } from 'react-bootstrap';
import axios from 'axios'; 

// internal import
import MovieData from './MovieData';
        
        

function Search() {
    const [searchBy, setSearchBy] = useState(""); 
    const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDlmYWYxMDMwOWFkN2FlYThlY2FkM2VlMTVlYzgwZiIsInN1YiI6IjYzYzVhYzkyZTU0ZDVkMDA5NGE4NzRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Cu0Nl_A_MljbUI9oNIWfgmcyD_K0JlmIfFG_HZUKv8"
    
    const fetchSearch = async () => {
        console.log('we here', searchBy)
        const responseSearch = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchBy}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
          }
        });
        
        
        const movieId = responseSearch.data.results[0].id
        
        
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${apiKey}`
                }
            }
        );
        
        
        return response.data
    }
    
    const {data: movie, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['movies'],
        queryFn: fetchSearch,
        enabled: false, // doesn't get called right aaway. we enable the API call
        refetchOnReconnect: true, // if the network reconnects for some reason we will make a new call
        // retry: 3, // how many times do we waant to retry the API call if it fails
        // retryDelay: 3000, 
        staleTime: 3 * 60 * 1000, // 3 x 60 seconds x 1000 milliseconds. This is how long the most resent call remains "fresh"
        gcTime: 15 * 60 * 1000 // this is how long data stays in the cache memory if it hasn't been used yet
    })
    
    const handleSubmit = (event) => {
        event.preventDefault();
        refetch(); // controlling making the query
    }
    
    if (isLoading) return <Spinner animation="grow" />
    if (isError) {
        setTimeout( () => {
        return <Modal
                        size="sm"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {error.message}
                        </Modal.Title>
                        </Modal.Header>
                    </Modal>
        }, 3000)}
    
    
    
  return (
    <Container>
        <Row>
            <Col>
                <Form onSubmit={handleSubmit} className='w-100 p-4 border rounded mt-5'>
                    <FloatingLabel controlId="Search" label="Search Title">
                        <Form.Control 
                            type="text" 
                            placeholder="Movie Title"  
                            onChange={ (event)=> setSearchBy(event.target.value)} />
                    </FloatingLabel>
                    <Button variant='outline-info' type='submit' className='mt-4'>Search</Button>
                </Form>
            </Col>
            {movie &&
            <MovieData searchData={movie} />
            }
        </Row> 
    </Container>
  )
}

export default React.memo(Search);
