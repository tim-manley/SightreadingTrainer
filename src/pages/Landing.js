import React from 'react';

function LandingPage() {
    return (
        <div>
            <a href="/login">Login</a> <br/>
            <a href="/home">Protected</a> <br/>
            <a href="/signup">Sign Up</a> <br/>
            <a href="/random">Random Note Generator</a>
        </div>
    );
};

export default LandingPage;