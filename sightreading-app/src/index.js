import React from "react";
import { createRoot } from "react-dom/client";
import BrowserRoutes from "./Routes";


// Render page
const root = createRoot(document.getElementById('root'));
root.render(<BrowserRoutes />, document.getElementById('root'));