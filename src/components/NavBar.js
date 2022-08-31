import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
    } from "../styles/Navigation.style"

function NavBar() {
    return (
        <>
            <Nav>
            <NavLink to='/'>
                Weather For Real
            </NavLink>
            <NavMenu>
                <NavLink to='/my-posts' activeStyle>
                My Posts
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to='/login'>Login</NavBtnLink>
            </NavBtn>
            </Nav>
        </>
    )
}

export default NavBar