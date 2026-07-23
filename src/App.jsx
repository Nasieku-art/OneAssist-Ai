import React from "react";
import Router from "./Router/Router"; 
import { AuthProvider } from "./Components/Auth"; 

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;