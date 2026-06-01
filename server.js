const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/eventDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

/* USER */
const User = mongoose.model("User", {
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

/* EVENT */
const Event = mongoose.model("Event", {
  email:       String,
  date:        String,
  time:        String,
  venue:       String,
  mealType:    String,
  menuType:    String,
  foodService: String,
  stayType:    String,
  roomType:    String,
  rooms:       String,
  image:       String,
  booked:      { type: Boolean, default: false },
});

/* AUTH ROUTES */

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ message: "User already exists" });
    const user = await User.create(req.body);
    res.status(201).json({ message: "Registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== req.body.password) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* EVENT ROUTES */

// Save Event
app.post("/api/events", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get user's events only
app.get("/api/events/:email", async (req, res) => {
  try {
    const data = await Event.find({ email: req.params.email });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update (also handles booking)
app.put("/api/events/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Event not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete
app.delete("/api/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
