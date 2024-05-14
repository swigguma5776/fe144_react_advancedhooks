import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

// internal imports
import './App.css';
import UserContext from './context/UserContext';
import Home from './components/Home';
import Login from './components/Login';
import WishList from './components/WishList';
import { store } from './store';
import { Provider } from 'react-redux';

function App() {
  const [user, setUser] = useState({name: '', isLoggedIn: false})

  return (
    <Provider store={store}>
      <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/wish-list' element={<WishList />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </Provider>
  )
}

export default App
