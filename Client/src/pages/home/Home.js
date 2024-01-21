import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Banner from "../shared/banner/Banner.js";
import Post from "../shared/post/Post.js";
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

    let request = {
        method: "get",
        baseURL: "http://localhost:3000/posts",
        headers: {"Authorization": `Bearer ${localStorage.jwt}`},
    } 

    if(posts == null){
        axios.request(request).then((response) => {
            const postDataList = response.data.posts;

            const postList = postDataList.map(postDataList => 
                <Post postId={ postDataList._id }
                    postUser={ postDataList.username }
                    postImage={ postDataList.image }
                    postCaption={ postDataList.caption }
                    postLikes={ postDataList.likes }
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
