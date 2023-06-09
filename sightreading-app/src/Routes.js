import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignUp from "./pages/SignUp";
import ProtectedPage from './pages/ProtectedPage';
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
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={user ? <Navigate to="/protected" /> : <LoginPage />}/>
        <Route exact path="/protected" element={user ? <ProtectedPage /> : <Navigate to="/"/>}/>
        <Route exact path="/signup" element={user ? <Navigate to="/protected" /> : <SignUp />} />
        <Route exact path="/random" element={<RandomGen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default BrowserRoutes;
