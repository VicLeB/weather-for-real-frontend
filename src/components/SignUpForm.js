import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/UserSlice';
import styled from 'styled-components';
import {BiErrorCircle} from 'react-icons/bi';
import {
    StyledForm,
    StyledInput,
    StyledButton,
} from '../styles/Form.style';
const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://weather-for-real.herokuapp.com/' : 'http://localhost:3000';

function SignUpForm({setShowLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [homeLocationCode, setHomeLocationCode] = useState('');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleCreateUser(e){
        e.preventDefault();

        fetch(`${ENDPOINT}/users`,{
            method: 'POST',
            headers:{
                Accepts: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    user:{
                        username: username,
                        password: password,
                        home_location_code: homeLocationCode,
                    },
                }),
        }).then((res) => {
            if(res.ok){
                res.json()
                    .then(()=>{
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
                    });
            }else{
                res.json().then((err)=> setErrors(err.error));
            }
        });
    }


    return (
        <>
            <StyledForm onSubmit={handleCreateUser}>
                <label>
            Username
                    <StyledInput type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                </label>
                {errors.username? <ErrorMessages><BiErrorCircle fontSize={20}/> Username {errors.username.map((error)=> `${error} `)}</ErrorMessages>:null}
                <label>
            Password
                    <StyledInput type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </label>
                {errors.password? <ErrorMessages><BiErrorCircle fontSize={20}/> Password {errors.password.map((error)=> `${error} `)}</ErrorMessages>:null}
                <label>
            Set default location with Zip/Postal code:
                    <StyledInput type="text" value={homeLocationCode} onChange={(e) => setHomeLocationCode(e.target.value)}/>
                    <h5>* enter a 5 digit zip-code, or 6 character postal-code (example: zip: 91111 or postal:L6H7M1)</h5>
                </label>
                {errors.home_location_code? <ErrorMessages><BiErrorCircle fontSize={20}/> {errors.home_location_code.map((error)=> `Zip/Postal code ${error} `)}</ErrorMessages>:null}
                <StyledButton type='submit' value="Create account">Create Account</StyledButton>
                <p>Already have an account? <StyledButton onClick={()=> setShowLogin(true)}>Sign in</StyledButton></p>
            </StyledForm>
        </>
    );
}

export default SignUpForm;

const ErrorMessages = styled.div`
    color: red;
    margin-bottom: 3px;
`;