import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";



const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/n-forms" activeStyle>
                    N-f4ms
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                    OOP.py
                    </NavLink>

                    <NavLink to="/contact" activeStyle>
                    Uml/Big*O/TDD
                    </NavLink>
                    <NavLink to="/blogs" activeStyle>
                    oopC#
                    </NavLink>

                    <NavLink to="/signup" activeStyle>
                        c#ooPV2
                    </NavLink>
                    <NavLink to="/etfamundi" activeStyle>
                    linQ 
                    </NavLink>
                    <NavLink to="/apiamundi" activeStyle>
                        API
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;