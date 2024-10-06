import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Formstyle.css";

function AdminLogin() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          "https://sheet.best/api/sheets/a1b752bb-5508-4975-bd7d-7ef8e70d9d85"
        );
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError("Failed to load reservations.");
      }
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <h3>All Reservations</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reservations.length > 0 ? (
        <table className="revTable2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Movie</th>
              <th>Theatre</th>
              <th>Tickets</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.Name}</td>
                <td>{reservation.email}</td>
                <td>{reservation.movieName}</td>
                <td>{reservation.theatre}</td>
                <td>{reservation.tickets}</td>
                <td>{reservation.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
}

export default AdminLogin;
