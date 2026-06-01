import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const nav = useNavigate();

  const login = async () => {
    try {
      setError("");
      if (!email || !password) { setError("Please fill all fields."); return; }
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      nav("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <p>Welcome back! Please login to continue.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}>Login</button>
      <p>New customer?{" "}
        <span style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }} onClick={() => nav("/register")}>
          Register here
        </span>
      </p>
    </div>
  );
}

export default Login;
