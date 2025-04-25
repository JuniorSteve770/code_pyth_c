import React from "react";
import {  Routes, Route, Link } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import QCM from "./pages/Georgecastel.js";
import './App.css';

function App() {
  return (
    
     
    <BrowserRouter>
      <QCM /> 
      {/* <div id="projects"> <Entreprises /></div> */}
    
    </BrowserRouter>

     
  );
}

export default App;
