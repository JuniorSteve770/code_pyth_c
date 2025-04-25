import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: linear-gradient(135deg, #002147, #A6192E);
    height: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 2rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 12;
`;

export const NavLink = styled(Link)`
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1.5rem;
    height: 100%;
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    &:hover {
        color: #FFD700;
    }

    &.active {
        color: #A6192E;
        border-bottom: 3px solid #FFD700;
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #ffffff;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        font-size: 2rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    justify-content: center;
    width: 100%;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;