import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/app.css"; 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();

  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!email || !emailPattern.test(email)) {
      newErrors.email = "*Enter a valid email.";
    }
    if (!password) {
      newErrors.password = "*Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        console.log("Logged in User:", user);

        navigate("/dashboard");
      } catch (err) {
        setErrors({ firebase: "Invalid email or password." });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const toggleVisibility = () => {
    const input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h2>Login</h2>
        {errors.firebase && <p className="error">{errors.firebase}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Enter Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Enter Password:</label>
            <div className="pass">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
              <i className="fa fa-eye" onClick={toggleVisibility}></i>
            </div>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="form-group">
          <p>
            New user? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
