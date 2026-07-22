import { useState } from "react";
import api from "../services/api";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await api.post("/auth/register", {
        name: name,
        email: email,
        password: password
      });

      setMessage("Registration successful!");

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {

      console.error(error);
      setMessage("Registration failed.");

    }
  };

  return (

    <div className="container">

      <h1>Create Account</h1>

      <form onSubmit={handleRegister}>

        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          Register
        </button>

      </form>

      {message && <p>{message}</p>}

    </div>

  );
}

export default Register;