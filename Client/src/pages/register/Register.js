import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  function handleSubmit(formEvent) {
    formEvent.preventDefault();

    const data = {
      email: email,
      username: username,
      pass: password,
    };

    let config = {
      method: "post",
      baseURL: "http://localhost:3000/register",
      data: {
        email: `${data.email}`,
        username: `${data.username}`,
        pass: `${data.pass}`,
      },
    };

    axios(config)
      .then(function (response) {
        if (response.status == 201) {
          console.log(response);
          setAlert("");
          navigate("/home");
        } else {
          setAlert("Email address already in use.");
        }
      })
      .catch((err) => {
        setAlert("Server error: Unable to create user.");
        console.error(err);
      });
  }
  return (
      <div className="register-wrapper">
        <div className="register">
          <div className="logo"></div>
          <form onSubmit={(event) => handleSubmit(event)}>
            <input
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            ></input>
            <input
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
            ></input>
            <input
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            ></input>
            <button>Sign up</button>
            <p>{alert}</p>
          </form>
        </div>
      </div>
  );
};

export default Register;
