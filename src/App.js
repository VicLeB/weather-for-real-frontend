import React, {useState, useEffect} from 'react';
import './App.css';
import {Navigate, Routes, Route} from 'react-router-dom'
import Home from './views/Home';
import Login from './views/Login';
import NavBar from './components/NavBar';
import MyPosts from './views/MyPosts';
const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000'

function App() {
const [currentUser, setCurrentUser] = useState(null)
const [loggedIn, setLoggedIn] = useState(false)

  useEffect(()=>{
    let token = localStorage.token
    if (token !== undefined && token.length>1){
      fetch(`${ENDPOINT}/auto_login`,{
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({token: token})
      }).then(resp => resp.json())
      .then(user =>setCurrentUser(user))
      .then(setLoggedIn(true))
    } else{
      setLoggedIn(false)
    }
  },[])
  console.log(loggedIn)
  console.log(currentUser)

  return (
    <div className="App">
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route path="/" element={ <Home currentUser={currentUser}/>}/>
        <Route path="/login" element={ <Login/>}/>
        <Route path="/my-posts" element={<MyPosts/>}/>
        <Route
            path="*"
            element={<Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
