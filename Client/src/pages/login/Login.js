import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  function handleSubmit(formEvent) {
    formEvent.preventDefault();

    const data = {
      email: email,
      pass: password,
    };

    let config = {
      method: "post",
      baseURL: "http://localhost:3000/login",
      data: {
        email: `${data.email}`,
        pass: `${data.pass}`,
      },
    };

    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          localStorage.setItem("jwt", response.data.token);
          setAlert("");
          navigate("/home");
        }
      })
      .catch((err) => {
        setAlert("Incorrect password provided.");
        console.error(err);
      });
  }
  return (
    <div className="login-wrapper">
      <div className="login">
        <div className="logo"></div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          ></input>
          <input
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
          ></input>
          <button>Log in</button>
          <p>{alert}</p>
        </form>
        <div className="signup">
          <p>
            {" "}
            Don't have an account?{" "}
            <a href="/register">
              <strong>Sign up here</strong>
            </a>{" "}
          </p>
        </div>
      </div>
      </div>
  );
};

export default Login;
