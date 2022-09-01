import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
const ENDPOINT = 'http://localhost:3000'

function LoginForm({user, setUser}) {
    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
    const [errors, setErrors]= useState([])

    const navigate = useNavigate()

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
            setUser(json.user.username)
            localStorage.setItem('token', json.jwt)
            navigate('/')
        })
    }

    return (
        <>
            {user? <div>Logged in as: {user}</div>: <div>No user logged in</div>}
            <form onSubmit={handleLogin}>
                <label>
                    Username
                    <input type='text' value={username} onChange={(e)=> setUsername(e.target.value)}/>
                </label>
                <label>
                    Password
                    <input type='password' value={password} onChange= {(e)=> setPassword(e.target.value)}/>
                </label>
                <input type='submit' value="Login"/>
            </form>
            {errors? <div>{errors}</div>:<div>Login Success!</div>}
        </>
    )
}

export default LoginForm