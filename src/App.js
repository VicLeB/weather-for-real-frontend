import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Routes, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/UserSlice';
import Home from './views/Home';
import Login from './views/Login';
import NavBar from './components/NavBar';
import MyPosts from './views/MyPosts';
import CreateNewPostForm from './components/CreateNewPostForm';

const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.token;

        if (token !== undefined && token.length > 1){
            fetch(`${ENDPOINT}/auto_login`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({token: token})
            }).then(resp => resp.json())
                .then(user => {
                    dispatch(setUser(user)
                    );});
        }
    }, []);

    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/my-posts" element={<MyPosts/>}/>
                <Route path="/create-post" element={<CreateNewPostForm/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </div>
    );
}

export default App;
