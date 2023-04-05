import React, { useState } from 'react';
import { Navigate, Routes} from 'react-router-dom';
import { Route} from 'react-router-dom';
import FIrsStr from './components/FIrsStr';
import HomePage from './components/HomePage/HomePage';
import PostsPage from './components/PostsPage/PostsPage';
import CheckIn from './components/Registation/CheckIn';
import Cheout from './components/Registation/Cheout';
import Profile from './components/Profile/Profile'
import GamePages from './components/GamePage.jsx/GamePages';
import Pacmane from './components/GamePage.jsx/Games/Pacman';
import AngryBird from './components/GamePage.jsx/Games/AngryBird';
import Snake from './components/GamePage.jsx/Games/Snake';


function App() {
  const [res, setRes] = useState({log: '', pas: ''})

  function reset(par) {
    setRes(par)
  }
  

  return (
    <div >
      <FIrsStr reset={res}/>
      <Routes>
        <Route path='/' element={<Profile/>}/>
        <Route path='/Home' element={<HomePage reset={reset}/>}/>
        <Route path='/Game' element={<GamePages reset={reset}/>}/>
        <Route path='/Game/Snake' element={<Snake reset={reset}/>}/>
        <Route path='/Game/Packman' element={<Pacmane reset={reset}/>}/>
        <Route path='/Game/ArgryBird' element={<AngryBird reset={reset}/>}/>
        <Route path='/Post' element={<PostsPage reset={reset}/>}/>
        <Route path='/SignIn' element={<CheckIn reset={reset}/>}/>
        <Route path='/RegIn' element={<Cheout/>}/>
        <Route path='/Profile' element={<Profile reset={reset}/>}/>
        <Route
          path="*"
          element={<Navigate to="/Home" replace />}
    />
      </Routes>
    </div>
  );
}

export default App;
