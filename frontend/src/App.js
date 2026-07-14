import { useState } from "react";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);

        setUserEmail(email);

        if (email.includes("admin")) {
          setUserRole("Admin");
        } else if (email.includes("analyst")) {
          setUserRole("Analyst");
        } else {
          setUserRole("Employee");
        }

        setIsLoggedIn(true);
      } else {
        setMessage("❌ Invalid Credentials");
      }
    } catch (error) {
      setMessage("⚠️ Server Error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setUserEmail("");
    setUserRole("");
    setEmail("");
    setPassword("");
  };

  if (isLoggedIn) {
    return (
      <Dashboard
        email={userEmail}
        role={userRole}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="container">
      <div className="login-card">

        <div className="logo">🛡️</div>

        <h1>Insider Threat</h1>
        <h2>Behavioral Intelligence System</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Secure Login
        </button>

        <p>{message}</p>

        <div className="footer-text">
          Secure Access Portal
        </div>

      </div>
    </div>
  );
}

export default App;