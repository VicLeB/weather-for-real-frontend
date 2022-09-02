import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    StyledForm,
    StyledInput,
    StyledButton,
} from '../styles/Form.style';
import { setUser } from '../slices/UserSlice';

const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';

function LoginForm({setShowLogin}) {
    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [errors]= useState([]);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    function handleLogin(e){
        e.preventDefault();
        fetch(`${ENDPOINT}/login`,{
            method: 'POST',
            headers: {
                Accepts: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                user:{
                    username,
                    password,
                }
            })
        }).then(res=> res.json())
            .then(json => {
                localStorage.setItem('token', json.jwt);
                dispatch(setUser(json.user));
                navigate('/');
            });
    }

    return (
        <>
            <StyledForm onSubmit={handleLogin}>
                <h2>Welcome Back!</h2>
                <label>
                    Username
                    <StyledInput type='text' value={username} onChange={(e)=> setUsername(e.target.value)}/>
                </label>
                <label>
                    Password
                    <StyledInput type='password' value={password} onChange= {(e)=> setPassword(e.target.value)}/>
                </label>
                <StyledButton type='submit' >Login</StyledButton>
                <p>Don&apos;t have and account? Create one now: <StyledButton onClick={()=> setShowLogin(false)}>Sign up</StyledButton>
                </p>
            </StyledForm>
            {errors? <div>{errors}</div>:<div>Login Success!</div>}
        </>
    );
}

export default LoginForm;