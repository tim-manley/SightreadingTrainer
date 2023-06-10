import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import SignUp from "./pages/SignUp";
import HomePage from './pages/Home';
import RandomGen from "./pages/RandomGen";
import { auth } from './firebase.js';
import { useIdToken } from "react-firebase-hooks/auth";

function BrowserRoutes() {
  const [user, loading, error] = useIdToken(auth);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>;
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={user ? <Navigate to="/home" /> : <LoginPage />}/>
        <Route exact path="/home" element={user ? <HomePage /> : <Navigate to="/"/>}/>
        <Route exact path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
        <Route exact path="/random" element={<RandomGen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default BrowserRoutes;
