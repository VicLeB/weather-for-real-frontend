import React, {useState} from 'react'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'

function Login() {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <>
            {showLogin? (
                <>
            <LoginForm />
            <p>Create an account <button onClick={()=> setShowLogin(false)}>Sign up</button>
            </p>
            </>
            ) : (
                <>
            <SignUpForm />
            <p>Already have an account? <button onClick={()=> setShowLogin(true)}>Sign in</button></p>
            </>
            )}
        </>
    )
}

export default Login