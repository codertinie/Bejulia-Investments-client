import React, { useState } from "react";
import axios from "axios";

import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [joinedAt, setJoinedAt] = useState("");
  // const [status, setStatus] = useState('');

  const navigate = useNavigate();

  const API = "https://bejulia-api.onrender.com"

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${API}/employees`,
        {
          name,
          username,
          email,
          password,
          role,
          joined_at: joinedAt,
          // status,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    navigate("/employees");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container"
      style={{ height: "550px", overflow: "scroll" }}
    >
      <h2>Create Employee</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          placeholder="Name"
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="joinedAt">Joined At:</label>
        <input
          type="date"
          id="joinedAt"
          value={joinedAt}
          onChange={(event) => setJoinedAt(event.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create Employee
      </button>
    </form>
  );
};

export default Register;
