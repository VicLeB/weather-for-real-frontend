import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    NavBtnLink,
    NavBtnLogout,
} from '../styles/Navigation.style';
import { logout } from '../slices/UserSlice';

function NavBar() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
            <Nav>
                <NavLink to='/'>
                Weather For Real
                </NavLink>
                {isLoggedIn? (
                    <>
                        <NavMenu>
                            <NavLink to='/my-posts'>
                        My Posts
                            </NavLink>
                        </NavMenu>
                        <NavBtn>
                            <NavBtnLogout onClick={handleLogout}>Logout</NavBtnLogout>
                        </NavBtn>
                    </>
                ) : (
                    <NavBtn>
                        <NavBtnLink to='/login'>Login</NavBtnLink>
                    </NavBtn>
                )}
            </Nav>
        </>
    );
}

export default NavBar;