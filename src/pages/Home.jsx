import React from "react";
import { auth } from '../firebase';
import { useSignOut } from "react-firebase-hooks/auth";
import { useIdToken } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function HomePage() {

    const [signOut, loadingSO, errorSO] = useSignOut(auth);
    const [user, loading, error] = useIdToken(auth);

    if (loadingSO) {
        return (
            <p>Loading...</p>
        );
    }
    if (errorSO) {
        return (
            <div>
                <p>Error: {errorSO.message}</p>
            </div>
        );
    }
    if (loading) {
        return (
            <div>
                <p>Initialising user...</p>
            </div>
        )
    }
    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        )
    }
    
    return (
        <>
            <Navbar />
            <h1>Protected page!</h1>
            <p>Email is: {user.email}</p>
            <Link to="/random">Random Gen</Link>
            <button onClick={async () => {
                const success = await signOut();
                if (success) {
                    alert("Successfully signed out.");
                }
            }}>
                Sign Out
            </button>
        </>
    );
};

export default HomePage;