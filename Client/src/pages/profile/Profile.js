import React, { useState } from "react";
import Banner from "../shared/banner/Banner.js";
import axios from "axios";
import CreatePostButton from "./CreatePostButton.js";

const Profile = () => {

    // Return JSX
    return(
        <>
            <Banner />
            <main>
                <p>Profile Page</p>
                <CreatePostButton />
            </main>
        </>
    );
}

export default Profile;
