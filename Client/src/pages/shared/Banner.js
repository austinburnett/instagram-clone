import React, { useState } from "react";
import "./assets/banner.css";

const Banner = () => {
    return(
        <header>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </header>
    );
}

export default Banner;
