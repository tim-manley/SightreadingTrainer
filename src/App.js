import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import LandingPage from './pages/Landing';
import SignUp from "./pages/SignUp";
import HomePage from './pages/Home';
import RandomGen from "./pages/RandomGen.jsx";
import { auth } from './firebase.js';
import { useIdToken, useSignOut } from "react-firebase-hooks/auth";
import SetupUser from "./pages/SetupUser.jsx";
import Skills from "./pages/Skills.jsx";
import './index.css';
import NotBuilt from "./pages/NotBuilt.jsx";

function App() {
  const [user, loading, error] = useIdToken(auth);

  if (loading) {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Navbar />
        <p>Error: {error.message}</p>;
      </>
      );
  }

  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user ? <Navigate to="/home" /> : <LandingPage />} />
          <Route exact path="/login" element={user ? <Navigate to="/home" /> : <Navigate to="/#login" />}/>
          <Route exact path="/home" element={user ? <HomePage /> : <Navigate to="/"/>}/>
          <Route exact path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
          <Route exact path="/random" element={user ? <RandomGen user={user} /> : <Navigate to="/login"/>} />
          <Route exact path="/setup" element={user ? <SetupUser user={user} /> : <Navigate to="/login" />} />
          <Route exact path="/skills" element={user ? <Skills user={user} /> : <Navigate to="/login"/>} />
          <Route exact path="/notbuilt" element={<NotBuilt />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
