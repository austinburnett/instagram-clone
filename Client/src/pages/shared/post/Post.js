import React, { useState } from "react";
import PostLikeButton from "./PostLikeButton.js";
import PostCommentButton from "./PostCommentButton.js";
import { useNavigate } from "react-router-dom";
import { useId } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./post.css";
import createRequestConfig from "./createRequestConfig.js";

const Post = ({postId, postUser, postImage, postCaption, postLikes, postComments}) => {
    const [numLikes, setNumLikes] = useState(postLikes.length);
    const [color, setColor] = useState("white");
    const [isLiked, setIsLiked] = useState(null);
    const uid = useId();

    let decodedToken = localStorage.jwt;
    try{
        decodedToken = jwtDecode(decodedToken);
    } catch(err){
        console.log(err);
    }

    const request = createRequestConfig("patch", `posts/${postId}/like`);

    let commentsList = postComments.map(postComments => 
        <li key={postComments._id} >
            {postComments.username}
            {": "}
            {postComments.text}        
        </li>
    );

    if(isLiked == null){
        postLikes.forEach(like => {
            if(like.username == decodedToken.username){
                setColor("red");
                setIsLiked(true);
            }
        });
    }
    
    function handleClick(){
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
            console.log(response);
        });
    }

    return(
        <>
            <div className="post">
                <p>{ postUser }</p>
                <img src={ postImage } />
                <PostLikeButton postLikes={ numLikes } likePost={ handleClick }
                                buttonColor={ color }/>
                <PostCommentButton postId={ postId } id={uid}/>
                <br />
                <p>{ postCaption }</p>
                <br />
                <ul id={ "comments-" + uid }>{ commentsList }</ul>
            </div>
        </>
    );
}

// Register is entrypoint
export default Post;