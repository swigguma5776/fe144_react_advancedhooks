import { configureStore } from "@reduxjs/toolkit";
import wishListReducer, { loadWishListState } from './features/wishListSlice';
import watchListReducer, { loadWatchListState } from "./features/watchListSlice";


// making some custom middleware state change to update localStorage
const localStorageMiddleware = store => next => action => {
    // updating state after every action finishes
    const result = next(action)
    
    // grab the current state after the action is finsihed and store it to localStorage
    localStorage.setItem('wishListState', JSON.stringify(store.getState().wishList))
    
    localStorage.setItem('watchListState', JSON.stringify(store.getState().watchList))
    console.log('in the middleware')

    return result; 
}



export const store = configureStore({
    reducer: {
        wishList: wishListReducer,
        watchList: watchListReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), localStorageMiddleware],
    preloadedState: {
        wishList: loadWishListState(),
        watchList: loadWatchListState()
    }
});