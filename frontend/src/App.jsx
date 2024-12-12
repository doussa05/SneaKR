import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Home from './Home';
import NavBar from './NavBar';
import Login from './Login'; 
import Footer from './Footer'; 
import './App.css';

function App() {
  return (
   
    <Router>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/navbar" element={<NavBar />} /> 
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
