import React from "react";
import { auth } from '../firebase';
import { useSignOut } from "react-firebase-hooks/auth";
import { useIdToken } from "react-firebase-hooks/auth";

function ProtectedPage() {

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
        <div>
            <h1>Protected page!</h1>
            <p>Email is: {user.email}</p>
            <button onClick={async () => {
                const success = await signOut();
                if (success) {
                    alert("Successfully signed out.");
                }
            }}>
                Sign Out
            </button>
        </div>
    );
};

export default ProtectedPage;