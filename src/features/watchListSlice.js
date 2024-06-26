import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const loadWatchListState = () => {
    try {
        const watchListState = localStorage.getItem('watchListState')
        if (watchListState === null) return initialState
        return JSON.parse(watchListState)
    } catch (err) {
        console.log(err.message)
        return undefined
    }
}




// Creating some asynchronous function usually API call
export const postToWatchList = createAsyncThunk(
    'watchList/postWatchList',
    async (data) => {
        // console.log(data, id, typeof id)
        try {
            // if (typeof id === 'number') {
            //     const response = await axios.put(
            //         `http://127.0.0.1:5000/watchlist/${id}`,
            //         data, // Pass data directly, no need for JSON.stringify
            //         {
            //             headers: {
            //                 'Content-Type': 'application/json'
            //             }
            //         }
            //     );
                
            //     console.log(response)
            // }  else {
                const responsePost = await axios.post(
                    'http://127.0.0.1:5000/watchlist',
                    data, // Pass data directly, no need for JSON.stringify
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(responsePost);
            // }
            
            const responseGet = await axios.get(
                'http://127.0.0.1:5000/watchlist'
            );
            console.log(responseGet);
            return responseGet.data; // Return response data, not entire response object
        
        } catch (error) {
            throw new Error('Failed to Post Data to Server: ' + error.message);
        }
    }
);

// Create my slice
const initialState = {
    watchList: [],
    status: 'idle', //'loading' | 'succeeded' | 'failed'
    error: null
};

export const watchListSlice = createSlice({
    name: 'watch list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postToWatchList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postToWatchList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.watchList = action.payload;
                console.log(state.watchList);
            })
            .addCase(postToWatchList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default watchListSlice.reducer;
