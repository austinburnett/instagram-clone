import React, { useState } from "react";

const PostCommentButton = () =>{
    const [color, setColor] = useState("white");

    let style = {
        backgroundColor: color,
        padding: "10px"
    }

    // Modify baseURL to be a env var
    let request = {
        method: "post",
        baseURL: "http://localhost:3000/posts/postid/comments/",
        headers: {"Authorization": `Bearer ${localStorage.jwt}`},
    } 

    function handleClick(){
        // Open a textbox for user to type
         
        setColor("green");
    }

    function onSubmit(){
        axios.request(request).then((response) => {
        }).catch((err) => {
                if(err.response.status == 401){
                    navigate("/login");
                }
            });
    }

    // left off figuring out a solution
    // for adding a dynamic text box so that a user can input text
    // and submit that data to create a comment
    return(
        <>
            <button style={ style } onClick={ handleClick }>Comment</button>
        </>
    );
}

export default PostCommentButton;
