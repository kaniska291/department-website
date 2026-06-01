import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Personal from "./Personal";
import Event from "./Event";
import Details from "./Details";
import View from "./View";
import Exit from "./Exit";

import "./index.css";

/* ---------------- BACKGROUND IMAGES ---------------- */
const bgImages = {
  "/":         "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200",
  "/register": "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200",
  "/login":    "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1200",
  "/home":     "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200",
  "/personal": "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=1200",
  "/event":    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200",
  "/details":  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200",
  "/view":     "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200",
  "/exit":     "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200",
};

/* ---------------- LANDING PAGE ---------------- */
function Landing() {
  const navigate = useNavigate();

  const images = [
    "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=400",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
    "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=400",
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=400",
  ];

  const labels = [
    "Sports Event", "Corporate Meeting", "Music Concert",
    "Wedding Ceremony", "Birthday Party", "College Fest",
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Our Past Events</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "15px", marginBottom: "30px" }}>
        {images.map((img, i) => (
          <div key={i} style={{ borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
            <img src={img} alt={labels[i]} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
            <p style={{ margin: "8px 0", fontWeight: "bold" }}>{labels[i]}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button onClick={() => navigate("/register")}>Continue</button>
        <button onClick={() => navigate("/exit")}>Exit</button>
      </div>
    </div>
  );
}

/* ---------------- HOME ---------------- */
function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Event Stewardship</h1>
      {user?.email && <p>Welcome, <b>{user.email}</b></p>}

      <button onClick={() => navigate("/personal")}>Personal</button>
      <button onClick={() => navigate("/event")}>Event</button>
      <button onClick={() => navigate("/details")}>Details</button>
      <button onClick={() => navigate("/view")}>View</button>
      <button onClick={() => navigate("/exit")}>Exit</button>
    </div>
  );
}

/* ---------------- PAGE WRAPPER WITH DYNAMIC BG ---------------- */
function PageWrapper({ children }) {
  const location = useLocation();
  const bg = bgImages[location.pathname] || bgImages["/"];

  return (
    <div
      className="full-page"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="container">{children}</div>
    </div>
  );
}

/* ---------------- APP ---------------- */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"         element={<PageWrapper><Landing /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/login"    element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/home"     element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/personal" element={<PageWrapper><Personal /></PageWrapper>} />
        <Route path="/event"    element={<PageWrapper><Event /></PageWrapper>} />
        <Route path="/details"  element={<PageWrapper><Details /></PageWrapper>} />
        <Route path="/view"     element={<PageWrapper><View /></PageWrapper>} />
        <Route path="/exit"     element={<PageWrapper><Exit /></PageWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;
