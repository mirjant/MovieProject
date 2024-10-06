import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker, Space, Radio, TimePicker, AutoComplete } from "antd";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; 

import "./Formstyle.css";
import { searchMovies } from "../DataApi"; 
function MyForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const FormDataSchema = z.object({
    email: z.string().email(),
    Name: z.string(),
    tickets: z.number().int().min(1).max(5),
    totalPrice: z.string().optional(),
    theatre: z.string(),
    date: z.string(),
    time: z.string(),
    movieName: z.string(),
    cardDetails: z
      .object({
        cardNumber: z.string().min(16).max(16).optional(),
        cvv: z.string().min(3).max(3).optional(),
        expirationDate: z
          .string()
          .regex(/^\d{2}\/\d{2}$/)
          .optional(),
      })
      .optional(),
  });

  const [isOnlinePurchase, setIsOnlinePurchase] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [theatre, setTheatre] = useState("Theatre 1");
  const [movieOptions, setMovieOptions] = useState([]);
  const [posterUrl, setPosterUrl] = useState(null);

  const onSubmit = async (formData, event) => {
    event.preventDefault();

    
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    if (!selectedTime) {
      alert("Please select a time.");
      return;
    }

    try {
      const reservationId = uuidv4(); // Generate a unique ID for the reservation

      const data = {
        ...formData,
        id: reservationId,
        date: selectedDate ? selectedDate.format("YYYY-MM-DD") : "",
        time: selectedTime || "",
        theatre,
        totalPrice: (formData.tickets * 5).toString(), 
      };

      
      FormDataSchema.parse(data);

     
      const response = await axios.post(
        "https://sheet.best/api/sheets/a1b752bb-5508-4975-bd7d-7ef8e70d9d85",
        data
      );

      if (response.status === 200) {
        console.log("Data sent successfully to Google Sheets");
        alert("Data sent successfully!");
      } else {
        console.error("Failed to send data:", response.statusText);
        alert("Failed to send data.");
      }

     
      const reservationData = JSON.stringify(data);
      localStorage.setItem("reservationData", reservationData);

      
      reset();
      setSelectedDate(null);
      setSelectedTime(null);
      setPosterUrl(null);
      setValue("movieName", "");
      setIsOnlinePurchase(false); 
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("Validation Errors:", error.errors);
      } else {
        console.error("Error sending data:", error);
      }
      alert("An error occurred while sending data.");
    }
  };

  const togglePurchaseType = () => {
    setIsOnlinePurchase(!isOnlinePurchase);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time, timeString) => {
    setSelectedTime(timeString);
  };

  const handleTheatreChange = (e) => {
    setTheatre(e.target.value);
  };

  const handleMovieSearch = async (query) => {
    if (query) {
      try {
        const movies = await searchMovies(query);
        setMovieOptions(
          movies.map((movie) => ({
            value: movie.title,
            label: movie.title,
            poster_path: movie.poster_path,
          }))
        );
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    } else {
      setMovieOptions([]);
    }
  };

  const handleMovieSelect = (value, option) => {
    setValue("movieName", value);
    const posterBaseUrl = "https://image.tmdb.org/t/p/w500"; 
    setPosterUrl(
      option.poster_path ? `${posterBaseUrl}${option.poster_path}` : null
    );
  };

  const tickets = watch("tickets") || 0;
  const ticketPrice = 5;
  const totalPrice = tickets * ticketPrice;

  return (
    <>
      <section className="container">
        <div className="form-container">
          <form className="grid-container" onSubmit={handleSubmit(onSubmit)}>
            <h4>Ticket price: ${ticketPrice}</h4>
            <label htmlFor="Name">Name:</label>
            <input
              id="Name"
              type="text"
              {...register("Name", { required: "Name is required" })}
            />
            {errors.Name && (
              <span className="error">{errors.Name.message}</span>
            )}

            <label htmlFor="movieName">Movie Name:</label>
            <AutoComplete
              id="movieName"
              options={movieOptions}
              onSearch={handleMovieSearch}
              onSelect={handleMovieSelect}
              {...register("movieName", { required: "Movie name is required" })}
              style={{ width: "77%", marginLeft: "auto", marginRight: "auto" }}
            >
              <input />
            </AutoComplete>
            {errors.movieName && (
              <span className="error">{errors.movieName.message}</span>
            )}

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}

            <label htmlFor="tickets">Number of Tickets:</label>
            <input
              id="tickets"
              type="number"
              {...register("tickets", {
                required: "Number of tickets is required",
                setValueAs: (value) => parseInt(value),
              })}
            />
            {errors.tickets && (
              <span className="error">{errors.tickets.message}</span>
            )}

            <div className="timedate">
              <Space direction="vertical">
                <DatePicker
                  className="timeDateBox"
                  onChange={handleDateChange}
                />
              </Space>

              <TimePicker
                className="timeDateBox"
                id="time"
                format={"HH:mm"}
                onChange={handleTimeChange}
              />
            </div>

            <label htmlFor="totalPrice">Total Price:</label>
            <input
              id="totalPrice"
              type="text"
              value={totalPrice.toString()}
              readOnly
            />

            {isOnlinePurchase && (
              <>
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                  id="cardNumber"
                  type="text"
                  {...register("cardNumber")}
                />

                <label htmlFor="cvv">CVV:</label>
                <input id="cvv" type="text" {...register("cvv")} />

                <label htmlFor="expirationDate">Expiration Date:</label>
                <input
                  id="expirationDate"
                  type="text"
                  {...register("expirationDate")}
                />
              </>
            )}

            <label htmlFor="theatre">Theatre:</label>
            <Radio.Group
              className="radio-group"
              id="theatre"
              onChange={handleTheatreChange}
              value={theatre}
            >
              <Space direction="vertical">
                <Radio value={"Theatre 1"}>Theatre 1</Radio>
                <Radio value={"Theatre 2"}>Theatre 2</Radio>
                <Radio value={"Theatre 3"}>Theatre 3</Radio>
              </Space>
            </Radio.Group>

            <button type="button" onClick={togglePurchaseType}>
              {isOnlinePurchase ? "Pay Here" : "Pay on Site"}
            </button>
            <input type="submit" id="submit-button" value="Submit" />
          </form>

          {/* Display the movie poster */}
          {posterUrl && (
            <div className="movie-poster">
              <img
                src={posterUrl}
                alt="Movie Poster"
                style={{ maxWidth: "300px" }}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default MyForm;
