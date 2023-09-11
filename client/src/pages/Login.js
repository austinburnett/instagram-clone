import React, { useState } from "react";
//import { useNavigate } from "react-router-dom"
import axios from "axios";
import "./styles.css";

const Login = () => {

    // States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event){
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
        axios(config).then(response => {
            // Set jwt in local storage
            localStorage.setItem("jwt", response.data.token)
        })
    }
    // console refreshes content when submitting form
    return(
        <div className="login">
            <button onClick={() => {handleSubmit()}}>Login</button>
            <form onSubmit={(event) => handleSubmit(event)}>
              <input onChange={(event) => setEmail(event.target.value)} placeholder="Email"></input>
              <br></br>
              <br></br>
              <input onChange={(event) => setPassword(event.target.value)} placeholder="Password"></input>
              <br></br>
              <br></br>
              <button>login</button>
            </form>
        </div>
    );
}

// Login is entrypoint
export default Login;
