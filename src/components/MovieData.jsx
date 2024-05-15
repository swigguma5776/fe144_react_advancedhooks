import React from 'react';
import { Card, ListGroup, Container } from 'react-bootstrap';
import { EmojiKiss } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';

// internal imports
import { useMovieData } from '../hooks/useMovieData';
import { addItem } from '../features/wishListSlice';
import { postToWatchList } from '../features/watchListSlice';
import '../App.css'

function MovieData({ searchData }) {
    let { movieData } = useMovieData(); //calling and deconstructing our custom hook
    const dispatch = useDispatch();
    
    // checking to see if we are searching for a movie instead of recommendation
    if (searchData) { movieData = searchData } 
    
     // If movieData is null or empty, return null or loading indicator
     if (!movieData || Object.keys(movieData).length == 0) {
        return <div>Loading...</div>; // or any other loading indicator
    }
    
    const handleDataConvert = ( movieData ) => {
        const movie = {
            id: movieData.id,
            original_title: movieData.original_title,
            poster_path: `https://image.tmdb.org/t/p/w185/${movieData.poster_path}`,
            genres: movieData.genres.map(movie => movie.name ).join(', '),
            overview: movieData.overview,
            release_date: movieData.release_date,
            popularity: Math.round(movieData.popularity)
        }
        
        return movie
    }
    
    const handleAddWishList = ( movieData ) => {
        const movie = handleDataConvert(movieData)
        dispatch(addItem( movie ))
        
    }
    
    const handleAddWatchList = ( movieData ) => {
        const movie = handleDataConvert(movieData)
        dispatch(postToWatchList(movie))
    }
    
   
    
    

    // want to display movie poster, title, overview, genre, popularity
    return (
        <Container >
            <Card className='movie-card d-flex flex-row p-3 shadow h-100'>
                <Card.Img variant="top" className='border rounded h-100 w-auto img-fluid'src={`https://image.tmdb.org/t/p/w185/${movieData.poster_path}`} />
                <Card.Body className='w-50'>
                    <Card.Title>{movieData.original_title} <EmojiKiss color='red' className='ms-2' onClick={ () => handleAddWishList(movieData) }/></Card.Title>
                    
                    <Card.Text>
                        {movieData.overview}
                    </Card.Text>
                    <ListGroup className="movie-list list-group-flush rounded">
                        <ListGroup.Item>Genres: {movieData.genres.map(movie => movie.name ).join(', ')}</ListGroup.Item>
                        <ListGroup.Item>Runtime: {movieData.runtime} minutes</ListGroup.Item>
                        <ListGroup.Item>Release Date: {movieData.release_date}</ListGroup.Item>
                        <ListGroup.Item>Popularity: {Math.round(movieData.popularity)}</ListGroup.Item>
                    </ListGroup>
                    <Card.Link className='btn btn-danger mt-3'onClick={ () => handleAddWatchList(movieData)}>Add to Watchlist</Card.Link>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default MovieData
