import React, { useState } from "react";

const PostLikeButton = ({postLikes, likePost, buttonColor}) =>{

    let style = {
        backgroundColor: buttonColor,
        padding: "10px"
    }

    return(
        <button style={ style } onClick={ likePost }>Like {postLikes}</button>
    );
}

export default PostLikeButton;
