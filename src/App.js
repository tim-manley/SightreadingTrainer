import { React } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Landing';
import './index.css';
import NotBuilt from "./pages/NotBuilt.jsx";
import Home from "./pages/Home.jsx";
import Quick from "./pages/Quick.jsx";
import AccountPrefs from "./pages/AccountPrefs.jsx";
import Testing from "./pages/Testing";

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
        <Route exact path="/testing" element={<Testing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
