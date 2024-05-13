import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

// internal imports
import './App.css';
import UserContext from './context/UserContext';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState({name: '', isLoggedIn: false})

  return (
    <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
