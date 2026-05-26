import { useState } from "react";

import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";


function App() {

  const [isAuthenticated, setIsAuthenticated] =
    useState(
      localStorage.getItem(
        "isAuthenticated"
      ) === "true"
    );


  const handleLogin = () => {
    setIsAuthenticated(true);
  };


  const handleLogout = () => {

    localStorage.removeItem(
      "isAuthenticated"
    );

    setIsAuthenticated(false);
  };


  return (

    <div>

      {isAuthenticated ? (

        <Dashboard
          onLogout={handleLogout}
        />

      ) : (

        <Login
          onLogin={handleLogin}
        />

      )}

    </div>
  );
}

export default App;