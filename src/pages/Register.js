import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.name]:e.target.value,
    });
  };

  const handleRegister = async () => {

    try {
      await axios.post("http://localhost:3000/register",formData);

      alert("Registered Successfully");

      navigate("/login");

    } catch (err) {

      alert(err.response.data.message);

    }
  };

  return (
  <div className="main">

    <div className="register-box">

      <h1>Register</h1>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={handleChange}
      />

      <button onClick={handleRegister}>
        Register
      </button>

      <p>
        Already have an account?
      </p>

      <button
        onClick={() =>
          navigate("/login")
        }
      >
        Login
      </button>

    </div>

  </div>
);}

export default Register;