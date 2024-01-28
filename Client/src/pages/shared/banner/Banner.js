import React, { useState } from "react";
import "./banner.css";
import { jwtDecode } from "jwt-decode";

const Banner = () => {
    let decodedToken = localStorage.jwt;
    try{
        decodedToken = jwtDecode(decodedToken);
    } catch(err){
        console.error(err);
    }

    return(
        <header>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href={`/profile/${decodedToken.username}`}>Profile</a></li>
            </ul>
        </header>
    );
}

export default Banner;
