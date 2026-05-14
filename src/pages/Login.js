import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const navigate = useNavigate();

  const handleChange = (e) => {

    setFormData({
      ...formData,[e.target.name]:e.target.value,
    });
  };

  const handleLogin = async () => {

    try {

      const res = await axios.post("http://localhost:3000/loginUser",formData);

      localStorage.setItem("token",res.data.token);

      alert("Login Successful");

      navigate("/todos");

    } catch (err) {

      alert(err.response.data.message);

    }
  };
return (
  <div className="full-page">

    <div className="background-card">

      <div className="floating one"></div>
      <div className="floating two"></div>
      <div className="floating three"></div>
      <div className="floating four"></div>

      <div className="gear gear1">⚙</div>
      <div className="gear gear2">⚙</div>

      <div className="login-form">

        <h1>Login</h1>

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

        <button onClick={handleLogin}>
          Login
        </button>

        <p>
          Don't have an account?
        </p>

        <button
          onClick={() =>
            navigate("/register")
          }
        >
          Register
        </button>

      </div>

    </div>

  </div>
);
}

export default Login;