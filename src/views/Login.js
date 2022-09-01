import React, {useState} from 'react'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import {StyledFormWrapper} from '../styles/Form.style'

function Login() {
    const [showLogin, setShowLogin] = useState(true)


    return (
        <>
            {showLogin? (
                <>
            <StyledFormWrapper>
            <LoginForm setShowLogin={setShowLogin}/>
            </StyledFormWrapper>
            </>
            ) : (
                <>
                <StyledFormWrapper>
            <SignUpForm setShowLogin={setShowLogin}/>
            </StyledFormWrapper>
            </>
            )}
        </>
    )
}

export default Login