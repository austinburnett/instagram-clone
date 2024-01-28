import React, { useState } from "react";
import axios from "axios";
import createRequestConfig from "./createRequestConfig.js";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const PostLikeButton = ({postId, likes}) =>{
    const [numLikes, setNumLikes] = useState(likes.length);
    const [color, setColor] = useState("white");
    const [isLiked, setIsLiked] = useState(null);

    let style = {
        backgroundColor: color,
        padding: "10px"
    }

    let decodedToken = localStorage.jwt;
    try{
        decodedToken = jwtDecode(decodedToken);
    } catch(err){
        console.log(err);
    }

    if(isLiked == null){
        likes.forEach(like => {
            if(like == decodedToken.username){
                setColor("red");
                setIsLiked(true);
            }
        });
    }

    function handleClick(){
        const request = createRequestConfig("patch", `posts/${postId}/like`);

        if(isLiked){
            setColor("white");
            setNumLikes(numLikes - 1);
            setIsLiked(false);
        }
        else{
            setColor("red");
            setNumLikes(numLikes + 1);
            setIsLiked(true);
        }
        axios.request(request).then((response) => {
            if(response.status == 401){
                console.error("Unauthorized");
                useNavigate("/login");
            }
        });
    }

    return(
        <button style={ style } onClick={ handleClick }>Like {numLikes}</button>
    );
}

export default PostLikeButton;
