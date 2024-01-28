import React, { useState } from "react";
import axios from "axios";
import Banner from "../shared/banner/Banner.js";
import Post from "../shared/post/Post.js";
import CreatePostButton from "./CreatePostButton.js";
import { useParams } from "react-router-dom";

const Profile = () => {
    const params = useParams();
    console.log(params)

    return(
        <>
            <Banner />
            <main>
                <p>{params.userId}</p>
                <p>Profile Page</p>
                <CreatePostButton />
                <ul></ul>
            </main>
        </>
    );
}

export default Profile;
