import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Formstyle.css";

function YourRezervation() {
  const [email, setEmail] = useState("");
  const [reservationData, setReservationData] = useState([]);
  const [error, setError] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    Name: "",
    movieName: "",
    date: "",
    time: "",
    theatre: "",
    tickets: "",
    totalPrice: "",
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Fetch the CSV data and parse it
  const fetchCSVData = async () => {
    try {
      const csvUrl =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRfohnTpoofI2jxsK4Csj2c0xvM5BERYs05Y_gkhUR6ybUtPXpbmQAlDVOZkDBv5oTWXVQWYsD45erX/pub?output=csv";
      const response = await axios.get(csvUrl);
      const parsedData = parseCSV(response.data);

      const filteredReservations = parsedData.filter(
        (reservation) => reservation.email === email
      );

      if (filteredReservations.length > 0) {
        setReservationData(filteredReservations);
        setError(null);
      } else {
        setReservationData([]);
        setError("No reservations found for this email.");
      }
    } catch (err) {
      console.error("Error fetching reservation data:", err);
      setError("An error occurred while fetching the data.");
    }
  };

  const parseCSV = (csvText) => {
    const rows = csvText.split(/\r?\n/);
    const headers = rows[0].split(",");
    const data = [];

    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(",");
      const rowObject = {};
      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = rowData[j];
      }
      data.push(rowObject);
    }

    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCSVData();
  };

  const handleEditClick = (index, reservation) => {
    setEditIndex(index);
    setEditFormData(reservation);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "tickets") {
      setEditFormData({
        ...editFormData,
        [name]: value,
        totalPrice: (value * 5).toString(),
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedReservation = { ...editFormData };
      const reservationId = updatedReservation.id;

      if (!reservationId) {
        setError("No ID found for this reservation.");
        return;
      }

      // Send a PUT request to update the reservation in the Google Sheets
      const response = await axios.put(
        `https://sheet.best/api/sheets/a1b752bb-5508-4975-bd7d-7ef8e70d9d85/id/${reservationId}`,
        updatedReservation
      );

      if (response.status === 200) {
        const updatedReservations = reservationData.map((reservation, index) =>
          index === editIndex ? updatedReservation : reservation
        );
        setReservationData(updatedReservations);
        setEditIndex(null); 
        alert("Reservation updated successfully!");
        setError(null);
      } else {
        setError("Failed to update the reservation.");
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
      alert("An error occurred while updating the reservation.");
      setError("An error occurred while updating the reservation.");
    }
  };

  const handleDeleteClick = async (reservation) => {
    try {
      const reservationId = reservation.id;

      if (!reservationId) {
        setError("No ID found for this reservation.");
        return;
      }

      
      const response = await axios.delete(
        `https://sheet.best/api/sheets/a1b752bb-5508-4975-bd7d-7ef8e70d9d85/id/${reservationId}`
      );

      if (response.status === 200) {
        setReservationData(
          reservationData.filter((res) => res.id !== reservationId)
        );
        setError(null);
        alert("Reservation deleted successfully!");
      } else {
        setError("Failed to delete the reservation.");
        console.error("No rows were deleted.");
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
      setError("An error occurred while deleting the reservation.");
    }
  };

  return (
    <div>
      <h2>Your Reservations</h2>
      <form className="revForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit">Search</button>
      </form>

      {reservationData.length > 0 && (
        <table className="revTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Movie Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Theatre</th>
              <th>Tickets</th>
              <th>Total Price</th>
              <th>Actions</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {reservationData.map((reservation, index) => (
              <tr key={index}>
                {editIndex === index ? (
                  <>
                    <td>{reservation.Name}</td>
                    <td>{reservation.movieName}</td>
                    <td>{reservation.date}</td>
                    <td>{reservation.time}</td>
                    <td>{reservation.theatre}</td>
                    <td>
                      <input
                        type="number"
                        name="tickets"
                        value={editFormData.tickets}
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>{editFormData.totalPrice}</td>
                    <td>
                      <button className="revButton" onClick={handleSaveEdit}>
                        Save
                      </button>
                      <button
                        className="revButton"
                        onClick={() => setEditIndex(null)}
                      >
                        Cancel
                      </button>
                    </td>
                    <td>{reservation.id}</td>
                  </>
                ) : (
                  <>
                    <td>{reservation.Name}</td>
                    <td>{reservation.movieName}</td>
                    <td>{reservation.date}</td>
                    <td>{reservation.time}</td>
                    <td>{reservation.theatre}</td>
                    <td>{reservation.tickets}</td>
                    <td>{reservation.totalPrice}</td>
                    <td>
                      <button
                        onClick={() => handleEditClick(index, reservation)}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteClick(reservation)}>
                        Delete
                      </button>
                    </td>
                    <td>{reservation.id ? reservation.id : "No ID"}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {error && <p className="revError">{error}</p>}
    </div>
  );
}

export default YourRezervation;
