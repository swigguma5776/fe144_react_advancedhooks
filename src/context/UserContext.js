import React, { createContext } from 'react'; 


// our first context aka global object we can access from ANYWHERE in the application
// setting up the shape of our context data
const UserContext = createContext({
    user: { name: '', isLoggedIn: false},
    setUser: () => {} // this will be a function in the future, default
})

export default UserContext; 