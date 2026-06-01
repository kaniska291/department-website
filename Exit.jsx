import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Exit() {
  const navigate = useNavigate();
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedOut(true);
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", textAlign: "center", paddingTop: "80px" }}>
      {loggedOut ? (
        <>
          <h2>✅ Successfully Logged Out!</h2>
          <p>Redirecting to home page...</p>
        </>
      ) : (
        <>
          <h2>Thank You for Visiting Our Website!</h2>
          <p>We hope to see you again soon.</p>
          <button onClick={handleLogout}>🔓 Logout</button>
          <br /><br />
          <button onClick={() => navigate("/home")}>Go Back</button>
        </>
      )}
    </div>
  );
}

export default Exit;
