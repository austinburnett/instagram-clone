import React, { useState } from "react";
import axios from "axios";
import Banner from "../shared/Banner.js";
import Post from "../shared/Post.js";
import "./home.css";


const Home = () => {
    return(
        <>
            <Banner />
            <main>
                <Post />
                <Post />
            </main>
        </>
    );
}
export default Home;
