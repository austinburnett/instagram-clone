import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const Login = () => {
    // States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");

    function handleSubmit(formEvent){
        formEvent.preventDefault();

        const data = {
            "email": email,
            "pass": password
        }

        let config = {
            method: "post",
            baseURL: "http://localhost:3000/login",
            data: {
                "email": `${data.email}`,
                "pass": `${data.pass}`
            }
        } 

        axios(config).then((response) => {
            if(response.status == 200){
                console.log(response);
                localStorage.setItem("jwt", response.data.token);
                setAlert("");
                // redirect to home page
                return;
            }
        }).catch((err) => {
            setAlert("Incorrect password provided.")
            console.error(err);
        });
    }
    return(
        <div className="login">
            <div className="login-content">

            
            <div className="logo"></div>

            <form onSubmit={(event) => handleSubmit(event)}>
              <input onChange={(event) => setEmail(event.target.value)} placeholder="Email"></input>
              <p>{alert}</p>
              <br></br>
              <input onChange={(event) => setPassword(event.target.value)} placeholder="Password"></input>
              <br></br>
              <br></br>
              <button>Login</button>
            </form>

            <a href="">Sign up here</a>

            </div>
        </div>
    );
}

// Login is entrypoint
export default Login;
