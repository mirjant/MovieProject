import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DatePicker, Space, Radio, TimePicker } from "antd";

import Navbar1 from "../Navbar1";

import "./Formstyle.css";

function MyForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const FormDataSchema = z.object({
    email: z.string().email(),
    Name: z.string(),
    tickets: z.number().int().min(1).max(5),
    totalPrice: z.string().optional(),

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

  const [value, setValue] = useState(1);

  // Define a mutation function using useMutation
  const mutation = useMutation((data) =>
    axios.post("http://localhost:3000/reservesios", data)
  );

  // Define a function to handle form submission
  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      // Validate form data against the schema
      FormDataSchema.parse(data);

      data.date = selectedDate;
      data.time = selectedTime;
      data.theatre = value;
      data.totalPrice = totalPrice;

      // If validation succeeds, proceed with form submission
      const response = await mutation.mutateAsync(data);
      console.log("Data sent successfully:", response.data);

      // Save the data to local storage
      const reservationData = JSON.stringify(data);
      localStorage.setItem("reservationData", reservationData);
      reset();
      // Handle success response here
    } catch (error) {
      // If validation fails, handle the error
      console.error("Error sending data:", error);
      // Handle error here
    }
  };

  const togglePurchaseType = () => {
    setIsOnlinePurchase(!isOnlinePurchase);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setSelectedDate(date);
  };

  const onChange1 = (e) => {
    setValue(e.target.value);
  };

  const onChangeTime = (time, timeString) => {
    setSelectedTime(timeString);
  };
  const tickets = watch("tickets");
  const tickedPrice = 5;
  const totalPrice = tickets ? tickets * tickedPrice : "";

  return (
    <>
      <Navbar1></Navbar1>
      <section className="container">
        <div>
         
          <form className="grid-container" onSubmit={handleSubmit(onSubmit)}>
          <h4>Ticked price: ${tickedPrice}</h4>
            <label htmlFor="Name">Name:</label>
            <input
              id="Name"
              type="text"
              {...register("Name", { required: true })}
            />
            {errors.Name && (
              <span className="error">{errors.Name.message}</span>
            )}

            <label htmlFor="movie-name">Movie Name:</label>
            <input
              id="movie-name"
              type="text"
              {...register("movie-name", { required: true })}
            />
            {errors.Name && (
              <span className="error">{errors.moviename.message}</span>
            )}

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
            <label htmlFor="tickets">Number of Tickets:</label>
            <input
              id="tickets"
              type="number"
              {...register("tickets", {
                required: true,
                setValueAs: (value) => parseInt(value),
              })}
            />
            {errors.tickets && (
              <span className="error">{errors.tickets.message}</span>
            )}

            {/* Additional inputs for reservation data */}
            <div className="timedate">
              <label htmlFor="date">Date:</label>
              <Space direction="vertical">
                <DatePicker className="timeDateBox" onChange={onChange} />
              </Space>
              {errors.date && (
                <span className="error">{errors.date.message}</span>
              )}
              <label htmlFor="time">Time:</label>
              <TimePicker
                className="timeDateBox"
                id="time"
                format={"HH:mm"}
                onChange={onChangeTime}
              />

              {errors.time && (
                <span className="error">{errors.time.message}</span>
              )}
            </div>
            <label htmlFor="totalPrice">Total Price:</label>
            <input
              id="totalPrice"
              type="text"
              {...register("totalPrice", { value: totalPrice })}
              value={totalPrice}
            />
            {errors.totalPrice && (
              <span className="error">{errors.totalPrice.message}</span>
            )}

            {isOnlinePurchase && (
              <>
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                  id="cardNumber"
                  type="text"
                  {...register("cardNumber")}
                />
                {errors.cardNumber && (
                  <span className="error">{errors.cardNumber.message}</span>
                )}

                <label htmlFor="cvv">CVV:</label>
                <input id="cvv" type="text" {...register("cvv")} />
                {errors.cvv && (
                  <span className="error">{errors.cvv.message}</span>
                )}

                <label htmlFor="expirationDate">Expiration Date:</label>
                <input
                  id="expirationDate"
                  type="text"
                  {...register("expirationDate")}
                />
                {errors.expirationDate && (
                  <span className="error">{errors.expirationDate.message}</span>
                )}
              </>
            )}
            {/*radio group*/}
            <label htmlFor="theatre">Theatre:</label>
            <Radio.Group id="theatre" onChange={onChange1} value={value}>
              <Space direction="vertical">
                <Radio value={"theatre 1"}>Theatre 1</Radio>
                <Radio value={"theatre 2"}>Theatre 2</Radio>
                <Radio value={"theatre 3"}>Theatre 3</Radio>
              </Space>
            </Radio.Group>
            {errors.theatre && (
              <span className="error">{errors.theatre.message}</span>
            )}
            {/* End of additional inputs */}
            <button type="button" onClick={togglePurchaseType}>
              {isOnlinePurchase ? "Pay Here" : "Pay on Site"}
            </button>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </section>
    </>
  );
}

export default MyForm;
