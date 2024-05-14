import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    wishList: [],
    totalItems: 0
}

export const wishListSlice = createSlice({
    name: 'wish list',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const movie = action.payload; //grabbing movie object from dispatch
            // state.wishList.push(movie) //push that movie object to our state.wishList
            const id = state.wishList.findIndex((value) => value.id == movie.id)
            if (state.wishList.length == 0 || (id == -1 && state.wishList.length > 0)){
                const newState = [...state.wishList, movie]
                state.wishList = newState
                console.log(state.wishList)
                state.totalItems = state.wishList.length
            } 
        },
        deleteItem: (state, action) => {
            const id = action.payload;
            console.log(id)
            const newState = state.wishList.filter((movie) => movie.id != id)
            state.wishList = newState
            state.totalItems = state.wishList.length
        }
        
    }
});

export const { addItem, deleteItem } = wishListSlice.actions;

export default wishListSlice.reducer; 