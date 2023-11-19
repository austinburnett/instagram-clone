import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const Register = () => {
    // States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");
    const navigate = useNavigate();

    function handleSubmit(formEvent){
        formEvent.preventDefault();

        const data = {
            "email": email,
            "pass": password
        }

        // Modify baseURL to be a env var
        let config = {
            method: "post",
            baseURL: "http://localhost:3000/register",
            data: {
                "email": `${data.email}`,
                "pass": `${data.pass}`
            }
        } 

        axios(config).then(function(response){
            if(response.status == 201){
                console.log(response);
                //localStorage.setItem("jwt", response.data.token);
                setAlert("");
                // Don't set this route in stone
                // Navigate to the next route in the stack
                navigate("/home");
            }
            else{ setAlert("Email address already in use."); }
        }).catch((err) => {
            setAlert("Server error: Unable to create user.")
            console.error(err);
        });
    }
    return(
        <main>
            <div className="blank"></div>
            <div>
            <div className="register">
                <div className="logo"></div>
                <br></br>
                <br></br>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <input onChange={(event) => setEmail(event.target.value)} placeholder="Email"></input>
                    <br></br>
                    <br></br>
                    <input onChange={(event) => setPassword(event.target.value)} placeholder="Password"></input>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button>Sign up</button>
                    <p>{alert}</p>
                    <br></br>
                    <br></br>
                    <br></br>
                </form>
            </div>
            </div>
        </main>
    );
}

// Register is entrypoint
export default Register;
