import React from "react";
import { BrowserRouter, Route, Routes, Redirect, Navigate } from 'react-router-dom';
import HomePage from './components/Home';
import LoginPage from './components/Login';
import ProtectedPage from './components/ProtectedPage';
import { auth } from './firebase.js';

function BrowserRoutes() {
  const user = auth.currentUser;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to="/protected" /> : <LoginPage />}/>
        <Route path="/protected" element={user ? <ProtectedPage /> : <Navigate to="/login"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default BrowserRoutes;
