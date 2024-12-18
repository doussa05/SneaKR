import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Home from './Home';
import NavBar from './NavBar';
import Login from './Login'; 
import Footer from './Footer'; 
import MyProfile from './MyProfile'; 
import MyWishList from './MyWishList'; 
import ProductDetail from './ProductDetail';
import Carousel from './Carousel'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/navbar" element={<NavBar />} /> 
            <Route path="/MyProfile" element={<MyProfile />} /> 
            <Route path="/MyWishList" element={<MyWishList/>} /> 
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/" element={<Carousel/>} /> 
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
