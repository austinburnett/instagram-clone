import React, { useState } from "react";
import axios from "axios";
import Banner from "../shared/banner/Banner.js";
import CreatePostButton from "./CreatePostButton.js";

const Profile = () => {

    // Return JSX
    return(
        <>
            <Banner />
            <main>
                <p>User's username</p>
                <p>Profile Page</p>
                <CreatePostButton />
            </main>
        </>
    );
}

export default Profile;
