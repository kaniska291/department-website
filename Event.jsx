import { useNavigate } from "react-router-dom";

function Event() {
  const navigate = useNavigate();

  const eventsList = [
    "Sports Event", "Corporate Meeting", "Music Concert",
    "Wedding Ceremony", "Birthday Party", "College Fest",
  ];

  return (
    <>
      <h2>Choose Event</h2>
      {eventsList.map((ev, i) => (
        <button key={i} onClick={() => {
          localStorage.setItem("selectedEvent", ev);
          alert(`Selected: ${ev}`);
          navigate("/home");
        }}>
          {ev}
        </button>
      ))}
      <br />
      <button onClick={() => navigate("/home")}>Back</button>
    </>
  );
}

export default Event;
