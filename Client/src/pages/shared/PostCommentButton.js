import React, { useState } from "react";

const PostCommentButton = () =>{
    const [color, setColor] = useState("white");

    let style = {
        backgroundColor: color,
        padding: "10px"
    }

    function handleClick(){
        setColor("red");
    }

    return(
        <button style={ style } onClick={ handleClick }>Comment</button>
    );
}

export default PostCommentButton;
