import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";

import "./banner.css";
import homeImage from "../assets/home.png";
import userImage from "../assets/user-profile.png";
import createPostImage from "../assets/create-post-button.png";

const Banner = () => {
  let decodedToken = localStorage.jwt;
  try {
    decodedToken = jwtDecode(decodedToken);
  } catch (err) {
    console.error(err);
  }

  return (
    <header>
      {/* <a href="https://www.flaticon.com/free-icons/home"> </a> */}
      <ul>
        <li>
          <a href="/home">
            <img height={"30px"} width={"30px"} src={homeImage} />
          </a>
        </li>
        <li>
          <a href={`/profile/${decodedToken.username}`}>
            <img height={"30px"} width={"30px"} src={userImage} />
          </a>
        </li>
        <li>
          <a href={""}>
            <img height={"30px"} width={"30px"} src={createPostImage} />
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Banner;
