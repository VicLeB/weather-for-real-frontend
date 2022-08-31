import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './views/Home';
import Login from './views/Login';
import NavBar from './components/NavBar';
import MyPosts from './views/MyPosts';

function App() {


  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={ <Home/>}/>
        <Route path="/login" element={ <Login/>}/>
        <Route path="/my-posts" element={<MyPosts/>}/>
      </Routes>
    </div>
  );
}

export default App;
