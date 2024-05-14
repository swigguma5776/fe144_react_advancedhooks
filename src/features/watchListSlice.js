import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// creating some asynchronous function usually API call
export const postToWatchList = createAsyncThunk(
    'watchList/postWatchList',
    async (data) => {
        console.log(data)
        const responsePost = await axios.post('https://dummyjson.com/posts/add', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            
        });
        console.log(responsePost)
        const responseGet = await axios.get('https://dummyjson.com/products')
        if (!responsePost.ok || !responseGet.ok){
            throw new Error('Failed to Post Data to Server')
        }
        console.log(responseGet)
        return responseGet
        
    }
    
)

//create my slice
const initialState = {
    watchList: [],
    status: 'idle', //'loading' | 'succeeded' | 'failed'
    error: null
}

export const watchListSlice = createSlice({
    name: 'watch list',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(postToWatchList.pending, (state, action)=>{
            state.status = 'loading'
        })
        .addCase(postToWatchList.fulfilled, (state, action)=>{
            state.status = 'succeeded'
            state.watchList = action.payload
        })
        .addCase(postToWatchList.rejected, (state, action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export default watchListSlice.reducer;

