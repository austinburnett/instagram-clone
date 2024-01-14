import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Banner from "../shared/Banner.js";
import Post from "../shared/Post.js";
import "./home.css";

const Home = () => {
    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();

    let decodedToken = localStorage.jwt;
    try{
        decodedToken = jwtDecode(decodedToken);
    } catch(err){
        console.log(err);
    }

    // Modify baseURL to be a env var
    let request = {
        method: "get",
        baseURL: "http://localhost:3000/posts",
        headers: {"Authorization": `Bearer ${localStorage.jwt}`},
    } 

    if(posts == null){
        axios.request(request).then((response) => {
            const postDataList = response.data.posts;

            const postList = postDataList.map(postDataList => 
                <Post postUser={ postDataList.username }
                    postImage={ postDataList.image }
                    postCaption={ postDataList.caption }
                    postLike={ postDataList.like }
                    postComments={ postDataList.comments }
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
                { posts }
            </main>
        </>
    );
}
export default Home;
