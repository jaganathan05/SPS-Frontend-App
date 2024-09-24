
import './App.css';
import Register from './Components/Authentication/Register';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Navigate, Route , Routes } from 'react-router-dom';
import Login from './Components/Authentication/Login';
import Home from './Components/Pages/Home';
import GameStates from './Components/Pages/GameStates';
import { useContext } from 'react';
import Authcontext from './Store/Auth_Context';

function App() {
  const Auth_Ctx = useContext(Authcontext)
  const isLoggedIn = Auth_Ctx.isloggedin
  return (
    <div className="App">
      <Routes>
        {!isLoggedIn && <>
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>}/> 
          <Route path='*' element={<Navigate to={'/login'}/>} />
         
        </>}
        {
          isLoggedIn && <>
          <Route path='/game-states' element={<GameStates/>}/>
          <Route path='/home' element={<Home/>}/> 
          <Route path='*' element={<Navigate to={'/home'}/>} />
          
          </>
        }
      
             
      </Routes>

     

    </div>
  );
}

export default App;
