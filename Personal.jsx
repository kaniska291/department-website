import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Personal() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const savePersonal = () => {
    if (!name || !mobile || !email) { alert("Please fill all details!"); return; }
    localStorage.setItem("personal", JSON.stringify({ name, mobile, email }));
    alert("Personal Details Saved!");
    navigate("/home");
  };

  return (
    <>
      <h2>Personal Details</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
      <input placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} /><br />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <button onClick={savePersonal}>Save</button>
      <button onClick={() => navigate("/home")}>Back</button>
    </>
  );
}

export default Personal;
