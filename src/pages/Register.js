import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3000/register", formData);

      setErrors({});
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // alert("Registered Successfully");
      navigate("/login");

    } catch (err) {
      const data = err.response?.data;

      let newErrors = {};

      if (data?.errors && !Array.isArray(data.errors)) {
        newErrors = data.errors;
      }

     
      else if (Array.isArray(data?.errors)) {
        data.errors.forEach((e) => {
          newErrors[e.param] = e.msg;
        });
      }

      else if (data?.message) {
        const msg = data.message.toLowerCase();

        if (msg.includes("email")) {
          newErrors.email = data.message;
        } else if (msg.includes("password")) {
          newErrors.password = data.message;
        } else if (msg.includes("name")) {
          newErrors.name = data.message;
        } else {
          newErrors.general = data.message;
        }
      }

      else {
        newErrors.general = "Something went wrong";
      }

      setErrors(newErrors);
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
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="error-text">{errors.name}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p id="error-text" className="error-text">{errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p id="error-text" className="error-text">{errors.password}</p>
        )}

        {errors.general && (
          <p className="error-text">{errors.general}</p>
        )}

        <button onClick={handleRegister}>
          Register
        </button>

        <p>Already have an account?</p>

        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;