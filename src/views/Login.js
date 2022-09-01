import React, {useState} from 'react'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'

function Login() {
    const [showLogin, setShowLogin] = useState(true)
    const [user, setUser] = useState(undefined)

    return (
        <>
            {showLogin? (
                <>
            <LoginForm user={user} setUser={setUser}/>
            <p>Create an account <button onClick={()=> setShowLogin(false)}>Sign up</button>
            </p>
            </>
            ) : (
                <>
            <SignUpForm user={user} setUser={setUser} />
            <p>Already have an account? <button onClick={()=> setShowLogin(true)}>Sign in</button></p>
            </>
            )}
        </>
    )
}

export default Login