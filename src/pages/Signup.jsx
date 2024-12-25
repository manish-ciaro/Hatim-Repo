import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/app.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();

  const patterns = {
    name: /^[A-Za-z]{4,15}( [A-Za-z]{1,15})?$/,
    email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    address: /^(?!\s)(?=.{4,30}$)(?:(\S+)(?:\s+\S+)*)?(?<!\s)$/,
    phone: /^[6-9]\d{9}$/,
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value || !patterns.name.test(value)) error = "*Enter a valid name.";
        break;
      case "email":
        if (!value || !patterns.email.test(value)) error = "*Enter a valid email.";
        break;
      case "password":
        if (!value || value.length < 8 || value.length > 15) {
          error = "*Password must be 8-15 characters long.";
        } else {
          if (!/[A-Z]/.test(value)) error = " One uppercase letter.";
          if (!/[a-z]/.test(value)) error = " One lowercase letter.";
          if (!/[0-9]/.test(value)) error = " One number.";
          if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) error = " One special character.";
        }
        break;
      case "repassword":
        if (value !== formData.password) error = "*Passwords do not match.";
        break;
      case "address":
        if (!value || !patterns.address.test(value)) error = "*Enter a valid address.";
        break;
      case "phone":
        if (!value || !patterns.phone.test(value)) error = "*Enter a valid phone number.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every((key) => !validateField(key, formData[key]));

    if (isValid) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        console.log("Registered User:", user);
        alert("Registered successfully!");
        navigate("/login");
      } catch (err) {
        setErrors((prev) => ({ ...prev, firebase: err.message }));
      }
    }
  };

  const toggleVisibility = (field) => {
    const input = document.getElementById(field);
    input.type = input.type === "password" ? "text" : "password";
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h2>Signup</h2>
        {errors.firebase && <p className="error">{errors.firebase}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <i
              className="fa fa-eye"
              onClick={() => toggleVisibility("password")}
            ></i>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="repassword">Confirm Password:</label>
            <input
              type="password"
              id="repassword"
              name="repassword"
              value={formData.repassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            {errors.repassword && <p className="error">{errors.repassword}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
