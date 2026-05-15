import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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
      general: "",
    }));
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/loginUser",
        formData
      );

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      setErrors({});

      navigate("/todos");
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
    <div className="full-page">
      <div id="bg" className="background-card">
        <div className="floating one"></div>
        <div className="floating two"></div>
        <div className="floating three"></div>
        <div className="floating four"></div>

        <div className="gear gear1">⚙</div>
        <div className="gear gear2">⚙</div>

        <div id="loginform" className="login-form">
          <h1>Login</h1>

          {errors.general && (
            <p className="error-text">{errors.general}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p id="text" className="error-text">{errors.email}</p>
          )}

         
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p id="text" className="error-text">{errors.password}</p>
          )}

          <button onClick={handleLogin}>
            Login
          </button>

          <p>Don't have an account?</p>

          <button onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;