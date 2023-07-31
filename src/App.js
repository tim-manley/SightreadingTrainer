import { React, useState, useEffect, useCallback } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import LandingPage from './pages/Landing';
import { auth, db } from './firebase.js';
import { useIdToken } from "react-firebase-hooks/auth";
import './index.css';
import NotBuilt from "./pages/NotBuilt.jsx";
import Home from "./pages/Home.jsx";
import Quick from "./pages/Quick.jsx";
import Loading from "./pages/Loading.jsx";
import AccountPrefs from "./pages/AccountPrefs.jsx";
import { doc, getDoc } from 'firebase/firestore';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />}/>
        <Route exact path="/home" element={<Home />}/>
        <Route exact path="/notbuilt" element={<NotBuilt />} />
        <Route exact path="/quick" element={<Quick />} />
        <Route exact path="/focussed" element={<NotBuilt /> } />
        <Route exact path="/custom" element={<NotBuilt /> } />
        <Route exact path="/settings" element={<NotBuilt /> } />
        <Route exact path="/account" element={<AccountPrefs /> } />
        <Route exact path="/analysis" element={<NotBuilt /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
