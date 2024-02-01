import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Banner from "../shared/banner/Banner.js";
import Post from "../shared/post/Post.js";
import CreatePostButton from "./CreatePostButton.js";
import PostImage from "../shared/post/PostImage.js";
import createRequestConfig from "../shared/post/createRequestConfig.js";

const Profile = () => {
    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();
    const params = useParams();

    const request = createRequestConfig("get", `posts?username=${params.userId}`);
    
    if(posts == null){
        axios.request(request).then((response) => {
            const postDataList = response.data.posts;

            const postList = postDataList.map(postDataList => 
                <PostImage postId={ postDataList._id }
                    image={ postDataList.image }
                    postCreatorUri={ postDataList.username }
                    key={ postDataList._id }
                />
            );
            setPosts(postList);

        }).catch((err) => {
                if(err.response.status == 401){
                    navigate("/login");
                }
            });
    }

    return(
        <>
            <Banner />
            <main>
                <p>{params.userId}'s Profile Page</p>
                <CreatePostButton />
                <div>
                    { posts }
                </div>
            </main>
        </>
    );
}

export default Profile;
