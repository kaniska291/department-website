import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const nav = useNavigate();

  const register = async () => {
    try {
      setError("");
      if (!email || !password) { setError("Please fill all fields."); return; }
      await axios.post("http://localhost:5000/api/auth/register", { email, password });
      alert("Registered successfully! Please login.");
      nav("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <p>New customer? Create your account below.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={register}>Register</button>
      <p>Already have an account?{" "}
        <span style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }} onClick={() => nav("/login")}>
          Login here
        </span>
      </p>
    </div>
  );
}

export default Register;
