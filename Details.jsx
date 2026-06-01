import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Details() {
  const navigate = useNavigate();

  const [needService, setNeedService] = useState("");
  const [mealType, setMealType] = useState("");
  const [menuType, setMenuType] = useState("");
  const [foodService, setFoodService] = useState("");
  const [stayType, setStayType] = useState("");
  const [roomType, setRoomType] = useState("");
  const [rooms, setRooms] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");

  const vendors = [
    { name: "Sri Balaji Catering", type: "Veg" },
    { name: "Annapoorna Caterers", type: "Veg" },
    { name: "Elite Events Catering", type: "Non-Veg" },
    { name: "Royal Feast Caterers", type: "Non-Veg" },
    { name: "Quick Bites", type: "Snacks" },
    { name: "Snack Hub", type: "Snacks" },
  ];

  const filteredVendors = vendors.filter((v) => v.type === menuType);

  const save = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) { alert("Please login first!"); navigate("/login"); return; }

      await axios.post("http://localhost:5000/api/events", {
        email: user.email,
        date, time, venue,
        mealType, menuType, foodService,
        stayType, roomType, rooms,
        booked: false,
      });

      alert("Event Details Saved Successfully!");
      navigate("/home");
    } catch (err) {
      alert("Failed to save: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Event Details</h2>

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><br />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} /><br />
      <input placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} /><br />

      <h3>Food & Accommodation Required?</h3>
      <button onClick={() => setNeedService("yes")}>Yes</button>
      <button onClick={() => setNeedService("no")}>No</button>

      {needService === "yes" && (
        <div>
          <h3>Food Details</h3>
          <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value="">Select Meal Type</option>
            <option>Breakfast</option><option>Lunch</option><option>Dinner</option>
            <option>Snacks</option><option>All Meals</option>
          </select><br />

          <select value={menuType} onChange={(e) => { setMenuType(e.target.value); setFoodService(""); }}>
            <option value="">Select Menu Type</option>
            <option>Veg</option><option>Non-Veg</option><option>Snacks</option>
          </select><br />

          <select value={foodService} onChange={(e) => setFoodService(e.target.value)}>
            <option value="">Select Catering Service</option>
            {filteredVendors.map((v, i) => (
              <option key={i} value={v.name}>{v.name} ({v.type})</option>
            ))}
          </select><br />

          <h3>Accommodation Details</h3>
          <select value={stayType} onChange={(e) => setStayType(e.target.value)}>
            <option value="">Select Stay Type</option>
            <option>Hotel</option><option>Hostel</option><option>Guest House</option>
          </select><br />

          <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
            <option value="">Select Room Type</option>
            <option>Single Room</option><option>Double Room</option>
            <option>Suite</option><option>No Accommodation</option>
          </select><br />

          <input type="number" placeholder="Number of Rooms" value={rooms} onChange={(e) => setRooms(e.target.value)} />
        </div>
      )}

      {needService === "no" && <p>No food or accommodation required.</p>}

      <br />
      <button onClick={save}>Save Event</button>
      <button onClick={() => navigate("/home")}>Back</button>
    </div>
  );
}

export default Details;
