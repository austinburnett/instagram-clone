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
        <main>
            <div className="blank"></div>
            <div>
            <div className="login">

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
                    <button>Log in</button>
                    <p>{alert}</p>
                    <br></br>
                    <br></br>
                    <br></br>
                </form>
                

            </div>

            <div className="signup">
                <p> Don't have an account? <a href=""><strong>Sign up here</strong></a> </p>
            </div>
            </div>
        </main>
    );
}

// Login is entrypoint
export default Login;
