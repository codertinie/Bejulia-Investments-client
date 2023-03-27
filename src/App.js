import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import Analytics from './pages/Analytics.jsx';
import Product from './pages/Product.jsx';
import ProductList from './pages/ProductList.jsx';
import Login from './pages/Login';
import Employees from './pages/Employees';
import Register from './pages/Register';

const App = () => {
  const [currentUser, setCurrentUser] = useState("")

  useEffect(() => {
    fetch("/auth")
    .then(res => {
      if(res.ok){
        res.json().then(user => setCurrentUser(user))
      }
    })
  },[])


  // if (!currentUser) return <Login setCurrentUser={setCurrentUser} />

  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;