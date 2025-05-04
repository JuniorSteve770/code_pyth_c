import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";



const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/n-forms" activeStyle>
                   ooPY
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                    OOP.py
                    </NavLink>

                    <NavLink to="/contact" activeStyle>
                    Uml/Big*O
                    </NavLink>
                    <NavLink to="/blogs" activeStyle>
                    Linux
                    </NavLink>

                    <NavLink to="/signup" activeStyle>
                    cmd
                    </NavLink>
                    <NavLink to="/etfamundi" activeStyle>
                    linQ 
                    </NavLink>
                    <NavLink to="/apiamundi" activeStyle>
                        All Apps
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;