import React, { useState } from "react";
import PostLikeButton from "./PostLikeButton.js";
import PostCommentButton from "./PostCommentButton.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./assets/post.css";

const Post = ({postId, postUser, postImage, postCaption, postLike, postComments}) => {
    let commentsList = postComments.map(postComments => 
        <li key={postComments._id} >
            {postComments.username}
            {": "}
            {postComments.text}        
        </li>
    );

    return(
        <>
            <div className="post">
                <p>{ postUser }</p>
                <img src={ postImage } />
                <PostLikeButton/>
                <PostCommentButton postId={ postId }/>
                <br />
                <p>{ postCaption }</p>
                <br />
                <ul>{ commentsList }</ul>
            </div>
        </>
    );
}

// Register is entrypoint
export default Post;
