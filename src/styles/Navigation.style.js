import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primaryColor,  } from './index.style';


export const Nav = styled.nav`
    background: ${primaryColor};
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding-left: 2vw;
    padding-right: 2vw;
    position: sticky;
    top: 0;
    z-index: 1;
`;

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    font-size: x-large;
    align-items: center;
    text-decoration: none;
    padding:0 1vw;
    height: 100%;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
        color: #055ca4;
    }
`;


export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100vw;
    white-space: nowrap;
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 10px;
    justify-content: flex-end;
    width: 100vw;
`;

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`;

export const NavBtnLogout = styled.button`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`;


