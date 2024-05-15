import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// internal imports
import './App.css';
import UserContext from './context/UserContext';
import Home from './components/Home';
import Login from './components/Login';
import MovieList from './components/MovieList';
import { store } from './store';

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState({name: '', isLoggedIn: false})

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <UserContext.Provider value={{user, setUser}}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/wish-list' element={<MovieList listType={'wish'}/>} />
              <Route path='/watch-list' element={<MovieList listType={'watch'}/>} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
