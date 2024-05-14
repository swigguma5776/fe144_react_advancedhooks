import {useEffect, useState , useContext} from 'react';
import axios from 'axios';



// our own custom hook. its so prescious
export const useMovieData = () => {
    const [movieData, setMovieData] = useState({}); // Change initial state to null
    const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDlmYWYxMDMwOWFkN2FlYThlY2FkM2VlMTVlYzgwZiIsInN1YiI6IjYzYzVhYzkyZTU0ZDVkMDA5NGE4NzRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Cu0Nl_A_MljbUI9oNIWfgmcyD_K0JlmIfFG_HZUKv8"
  
    useEffect(() => {
        
        const fetchData = async () => {
            const movieId = Math.floor(Math.random() * (500 - 70) + 70);
            
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                    {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${apiKey}`
                        }
                    }
                );
                console.log(response.data)
                setMovieData(response.data); // Use response.data
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchData(); // Call the fetchData function

    }, []); // no dependencies so get's called once right away (once page mounts to DOM)

    console.log(movieData)
    return { movieData };
};




// EXAMPLE USING A DEPENDENCY
// import UserContext from '../context/UserContext';

// // our own custom hook. its so prescious
// export const useMovieData = () => {
//     const [movieData, setMovieData] = useState({}); // Change initial state to null
//     const { user } = useContext(UserContext)
  
//     useEffect(() => {
        
//         const fetchData = async () => {
//             const movieId = Math.floor(Math.random() * (500 - 70) + 70);
//             try {
//                 const response = await axios.get(
//                     `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
//                     {
//                         headers: {
//                             accept: 'application/json',
//                             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDlmYWYxMDMwOWFkN2FlYThlY2FkM2VlMTVlYzgwZiIsInN1YiI6IjYzYzVhYzkyZTU0ZDVkMDA5NGE4NzRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Cu0Nl_A_MljbUI9oNIWfgmcyD_K0JlmIfFG_HZUKv8'
//                         }
//                     }
//                 );
//                 console.log(response.data)
//                 setMovieData(response.data); // Use response.data
//             } catch (error) {
//                 console.error('Error fetching movie data:', error);
//             }
//         };

//         fetchData(); // Call the fetchData function

//     }, [user]); // no dependencies so get's called once right away (once page mounts to DOM)

//     console.log(movieData)
//     return { movieData };
// };
