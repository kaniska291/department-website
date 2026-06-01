import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const vendors = [
  { name: "Sri Balaji Catering", type: "Veg" },
  { name: "Annapoorna Caterers", type: "Veg" },
  { name: "Elite Events Catering", type: "Non-Veg" },
  { name: "Royal Feast Caterers", type: "Non-Veg" },
  { name: "Quick Bites", type: "Snacks" },
  { name: "Snack Hub", type: "Snacks" },
];

function View() {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const filteredVendors = vendors.filter((v) => v.type === editData.menuType);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) { navigate("/login"); return; }
        const res = await axios.get(`http://localhost:5000/api/events/${user.email}`);
        setDetails(res.data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    setDetails((prev) => prev.filter((d) => d._id !== id));
    alert("Event deleted successfully.");
  };

  const handleBook = async (id) => {
    if (!window.confirm("Confirm booking this event?")) return;
    const res = await axios.put(`http://localhost:5000/api/events/${id}`, { booked: true });
    setDetails((prev) => prev.map((d) => (d._id === id ? res.data : d)));
    alert("🎉 Event booked successfully! We will contact you shortly.");
  };

  const saveEdit = async () => {
    const res = await axios.put(`http://localhost:5000/api/events/${editId}`, editData);
    setDetails((prev) => prev.map((d) => (d._id === editId ? res.data : d)));
    setEditId(null);
    alert("Details updated successfully!");
  };

  if (loading) return <p>Loading your events...</p>;

  return (
    <div>
      <h2>View Details</h2>

      {details.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        details.map((d) => (
          <div key={d._id} className="card">

            {d.booked && <p style={{ color: "green", fontWeight: "bold" }}>✅ This event is BOOKED!</p>}

            {editId !== d._id ? (
              <>
                <p><b>Date:</b> {d.date}</p>
                <p><b>Time:</b> {d.time}</p>
                <p><b>Venue:</b> {d.venue}</p>
                <p><b>Meal Type:</b> {d.mealType || "-"}</p>
                <p><b>Menu Type:</b> {d.menuType || "-"}</p>
                <p><b>Catering:</b> {d.foodService || "-"}</p>
                <p><b>Stay Type:</b> {d.roomType === "No Accommodation" ? "-" : d.stayType || "-"}</p>
                <p><b>Room Type:</b> {d.roomType === "No Accommodation" ? "-" : d.roomType || "-"}</p>
                <p><b>Rooms:</b> {d.roomType === "No Accommodation" ? "-" : d.rooms || "-"}</p>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  {!d.booked && (
                    <button onClick={() => { setEditId(d._id); setEditData({ ...d }); }}>✏️ Update Details</button>
                  )}
                  <button onClick={() => handleDelete(d._id)}>🗑️ Delete</button>
                  {!d.booked && (
                    <button onClick={() => handleBook(d._id)}>📅 Book Event</button>
                  )}
                </div>
              </>
            ) : (
              <div>
                <h3>Update Details</h3>

                <label>Date:</label>
                <input type="date" value={editData.date || ""} onChange={(e) => setEditData({ ...editData, date: e.target.value })} /><br />

                <label>Time:</label>
                <input type="time" value={editData.time || ""} onChange={(e) => setEditData({ ...editData, time: e.target.value })} /><br />

                <label>Venue:</label>
                <input placeholder="Venue" value={editData.venue || ""} onChange={(e) => setEditData({ ...editData, venue: e.target.value })} /><br />

                <label>Meal Type:</label>
                <select value={editData.mealType || ""} onChange={(e) => setEditData({ ...editData, mealType: e.target.value })}>
                  <option value="">Select Meal Type</option>
                  <option>Breakfast</option><option>Lunch</option><option>Dinner</option>
                  <option>Snacks</option><option>All Meals</option>
                </select><br />

                <label>Menu Type:</label>
                <select value={editData.menuType || ""} onChange={(e) => setEditData({ ...editData, menuType: e.target.value, foodService: "" })}>
                  <option value="">Select Menu Type</option>
                  <option>Veg</option><option>Non-Veg</option><option>Snacks</option>
                </select><br />

                <label>Catering Service:</label>
                <select value={editData.foodService || ""} onChange={(e) => setEditData({ ...editData, foodService: e.target.value })}>
                  <option value="">Select Catering Service</option>
                  {filteredVendors.map((v, i) => (
                    <option key={i} value={v.name}>{v.name} ({v.type})</option>
                  ))}
                </select><br />

                <label>Stay Type:</label>
                <select value={editData.stayType || ""} onChange={(e) => setEditData({ ...editData, stayType: e.target.value })}>
                  <option value="">Select Stay Type</option>
                  <option>Hotel</option><option>Hostel</option><option>Guest House</option>
                </select><br />

                <label>Room Type:</label>
                <select value={editData.roomType || ""} onChange={(e) => setEditData({ ...editData, roomType: e.target.value })}>
                  <option value="">Select Room Type</option>
                  <option>Single Room</option><option>Double Room</option>
                  <option>Suite</option><option>No Accommodation</option>
                </select><br />

                <label>Number of Rooms:</label>
                <input type="number" placeholder="Rooms" value={editData.rooms || ""} onChange={(e) => setEditData({ ...editData, rooms: e.target.value })} /><br />

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button onClick={saveEdit}>💾 Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))
      )}

      <button onClick={() => navigate("/home")}>Back</button>
    </div>
  );
}

export default View;
