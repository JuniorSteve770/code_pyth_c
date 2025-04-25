import React from "react";
import Navbar from "./component/Navbar.js";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home.js";
import Nforms from "./pages/N_forms.js";
import Blogs from "./pages/blogs";
import SignUp from "./pages/oop_python.js";
import SignUp2 from "./pages/signup.js";
import Contact from "./pages/contact.js";
import Amundi from "./pages/etfamundi";
import ApiAmundi from "./pages/apiamundi";


import './App.css';

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/n-forms" element={<Nforms/>} />
        <Route path="/contact"  element={<Contact/>}/>
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/signup" element={<SignUp2/>} />
        <Route path="/etfamundi" element={<Amundi/>}/>
        <Route path="/apiamundi" element={<ApiAmundi/>}/>
    </Routes>
</Router>


     
  );
}

export default App;
