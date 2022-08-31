import React, {useState} from 'react'

function LoginForm() {
    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
    const [errors, setErrors]= useState([])

    function handleLogin(e){
        e.preventDefault();
    }

    return (
        <>
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