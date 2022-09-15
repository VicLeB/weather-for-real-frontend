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
    const [errors, setErrors]= useState([]);
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
        }).then((res)=> {
            if(res.ok){
                res.json().then(json => {
                    localStorage.setItem('token', json.jwt);
                    dispatch(setUser(json.user));
                    navigate('/');
                });
            }else{
                res.json().then((res)=> setErrors(res));
            }
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
                {errors.message?<div>{errors.message}</div>:null}
                <StyledButton type='submit' >Login</StyledButton>
                <p>Don&apos;t have and account? Create one now: <StyledButton onClick={()=> setShowLogin(false)}>Sign up</StyledButton>
                </p>
            </StyledForm>
        </>
    );
}

export default LoginForm;