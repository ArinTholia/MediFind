import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post("/auth/login", {
        email: email,
        password: password
      });

      console.log("Login response:", response.data);

      // Save login status in browser
      localStorage.setItem("isLoggedIn", "true");

      setMessage("Login successful!");

      // Redirect to Dashboard after 1 second
      setTimeout(() => {
  navigate("/dashboard");
  window.location.reload();
}, 1000);
    } catch (error) {

      console.error("Login error:", error);

      // Remove login status if login fails
      localStorage.removeItem("isLoggedIn");

      setMessage("Invalid email or password.");

    }

  };

  return (

    <div className="container">

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <div>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>

        <div>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        </div>

        <button type="submit">

          Login

        </button>

      </form>

      {message && <p>{message}</p>}

    </div>

  );

}

export default Login;