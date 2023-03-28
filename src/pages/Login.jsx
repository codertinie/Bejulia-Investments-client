import React, { useState } from "react";
import "../styles/Login.css";

const API = "https://bejulia-api.onrender.com"

function Login({ setCurrentUser }) {
  // React States
  // const [superUser, setSuperUser] = useState ([])
  const [user, setUser] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a request to the server to authenticate the user
    fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.username)
        
        // Handle the authentication response from the server
        if (data.username === "admin") {
          setCurrentUser(data)
        }else{
          setUser(data)
        }
          
      })
      .catch((error) => console.error(error));
  };
  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required 
          value={username}
          onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required 
          value={password}
          onChange={(event) => setPassword(event.target.value)}/>
          
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {/* {isSubmitted ? <div>User is successfully logged in</div> : renderForm} */}
        {renderForm}
      </div>
    </div>
  );
}

export default Login;