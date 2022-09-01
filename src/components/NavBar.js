import React from 'react'
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    NavBtnLink,
    NavBtnLogout,
    } from "../styles/Navigation.style"

function NavBar({loggedIn, setLoggedIn, setCurrentUser}) {

    function handleLogout(){
        localStorage.removeItem('token');
        setLoggedIn(false)
        setCurrentUser(null)
    }

    return (
        <>
            <Nav>
            <NavLink to='/'>
                Weather For Real
            </NavLink>
            {loggedIn? <>
            <NavMenu>
                <NavLink to='/my-posts'>
                My Posts
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLogout onClick={handleLogout}>Logout</NavBtnLogout>
            </NavBtn>
            </>
            :
            <NavBtn>
                <NavBtnLink to='/login'>Login</NavBtnLink>
            </NavBtn>
                }
            </Nav>
        </>
    )
}

export default NavBar