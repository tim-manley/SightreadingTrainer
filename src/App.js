import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
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
  const [signOut, loadingSO, errorSO] = useSignOut(auth);

  let content;

  if (loading || loadingSO) {
    content =
      <div>
        <p>Loading...</p>
      </div>;
  }
  if (error || errorSO) {
    content =
      <div>
        <p>Error: {error ? error.message : errorSO.message}</p>;
      </div>;
  }

  return (
    <BrowserRouter>
      {(loading || error || loadingSO || errorSO) ? content : // Show loading/error if loading/error, otherwise use router
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={user ? <Navigate to="/home" /> : <LoginPage />}/>
          <Route exact path="/home" element={user ? <HomePage /> : <Navigate to="/login"/>}/>
          <Route exact path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
          <Route exact path="/random" element={user ? <RandomGen user={user} /> : <Navigate to="/login"/>} />
          <Route exact path="/setup" element={user ? <SetupUser user={user} /> : <Navigate to="/login" />} />
          <Route exact path="/skills" element={user ? <Skills user={user} /> : <Navigate to="/login"/>} />
          <Route exact path="/notbuilt" element={<NotBuilt />} />
        </Routes>
      }
    </BrowserRouter>
  );
}

export default App;
