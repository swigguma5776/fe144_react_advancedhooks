import React from 'react';
import { Card, ListGroup, Container } from 'react-bootstrap';

// internal imports
import { useMovieData } from '../hooks/useMovieData';

function MovieData() {
    const { movieData } = useMovieData(); //calling and deconstructing our custom hook
    console.log(movieData)
    
     // If movieData is null or empty, return null or loading indicator
     if (!movieData || Object.keys(movieData).length == 0) {
        return <div>Loading...</div>; // or any other loading indicator
    }

    // want to display movie poster, title, overview, genre, popularity
    return (
        <Container>
            <Card className='d-flex flex-row p-3 shadow'>
                <Card.Img variant="top" className='border rounded'src={`https://image.tmdb.org/t/p/w185/${movieData.poster_path}`} />
                <Card.Body>
                    <Card.Title>{movieData.original_title}</Card.Title>
                    <Card.Text>
                        {movieData.overview}
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Genres: {movieData.genres.map(movie => movie.name ).join(', ')}</ListGroup.Item>
                        <ListGroup.Item>Runtime: {movieData.runtime} minutes</ListGroup.Item>
                        <ListGroup.Item>Release Date: {movieData.release_date}</ListGroup.Item>
                        <ListGroup.Item>Popularity: {Math.round(movieData.popularity)}</ListGroup.Item>
                    </ListGroup>
                    <Card.Link className='btn btn-info mt-3'href="#">Add to Watchlist</Card.Link>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default MovieData
