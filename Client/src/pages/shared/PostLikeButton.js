import React, { useState } from "react";

const PostLikeButton = () =>{
    const [color, setColor] = useState("white");

    // In order to append a like to a post, I need to know the postId,
    // and the username of the user liking the post. With this info,
    // the postId needs to be tightly coupled to the like button.
    // This means that every like button req should have a different endpoint
    
    // Like button needs:
    // postId, userId
    //
    // Axios request will look something like this:
    // http://localhost:3000/posts/<postId>/like
    //
    // The user info will come from the jwt
    // The post info will have to come through props or?

    let style = {
        backgroundColor: color,
        padding: "10px"
    }

    function handleClick(){
        // This would be if this user like this post then
        // set color to red.
        setColor("red");
    }

    return(
        <button style={ style } onClick={ handleClick }>Like</button>
    );
}

export default PostLikeButton;
