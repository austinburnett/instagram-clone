import React, { useState } from "react";
import PostLikeButton from "./PostLikeButton.js";
import PostCommentButton from "./PostCommentButton.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./assets/post.css";

// I would like this to take in props in order to display
// everything needed that a post has.
// Actually, may not want to share state for a component since each post needs
// to have its own state
const Post = ({postUser, postImage, postCaption, postLike, postComments}) => {
    return(
        <>
            <div className="post">
                <p>{ postUser }</p>
                <img src={ postImage } />
                <PostLikeButton/>
                <PostCommentButton/>
                <br />
                <p>{ postCaption }</p>
                <br />
                <p>Comments.... Loading</p>
            </div>
        </>
    );
}

// Register is entrypoint
export default Post;
