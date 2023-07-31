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

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Always start with true
  const [newUser, setNewUser] = useState(true)

  useEffect(() => {
    console.log("using an effect here")
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("auth changed", user);
      setUser(user); // Set the user object
      // If there is a user, check if they have a doc
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
          console.log("Got the docsnap:", docSnap);
          if (docSnap.data()) {
            console.log("user has data");
            setNewUser(false);
          } else {
            console.log("user has NO data");
            setNewUser(true);
          }
          setLoading(false);
        })
      } else {
        setLoading(false); // No more loading needed
      }
    }, []);

    return () => {
      unsubscribe();
    }
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
        {(!user || (user && newUser)) && 
          <Routes>
            <Route exact path="*" element={<><Navigate to="/" />{console.log("navigating")}</>}/>
            <Route exact path="/" element={<LandingPage user={user} newUser={newUser}/>}/>
          </Routes>
        }
        {(user && !newUser) &&
          <Routes>
            <Route exact path="/" element={<Navigate to="/home"/>}/>
            <Route exact path="/home" element={<Home user={user} />}/>
            <Route exact path="/notbuilt" element={<NotBuilt />} />
            <Route exact path="/quick" element={<Quick user={user} />} />
            <Route exact path="/focussed" element={<NotBuilt /> } />
            <Route exact path="/custom" element={<NotBuilt /> } />
            <Route exact path="/settings" element={<NotBuilt /> } />
            <Route exact path="/account" element={<AccountPrefs /> } />
            <Route exact path="/analysis" element={<NotBuilt /> } />
          </Routes>
        }
    </BrowserRouter>
  );
}

export default App;
