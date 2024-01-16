import React, { useState } from "react";
import axios from "axios";

const PostCommentButton = ({postId}) =>{
    const [color, setColor] = useState("white");
    const [data, setData] = useState(null);

    let style = {
        backgroundColor: color,
        padding: "10px"
    }

    // Modify baseURL to be a env var
    let request = {
        method: "post",
        baseURL: `http://localhost:3000/posts/${postId}/comments/`,
        headers: {
            "Authorization": `Bearer ${localStorage.jwt}`,
            "Content-Type": "text/plain"
        },
        data: `${data}`
    } 

    function handleClick(){
        // Open a textbox for user to type
         
        setColor("green");
    }

    function onSubmit(){
        console.log(data);
        axios(request).then((response) => {
            console.log(response);
        }).catch((err) => {
                if(err.response.status == 401){
                    navigate("/login");
                }
            });
    }

    // 1. left off figuring out a solution
    // for adding a dynamic text box so that a user can input text
    // and submit that data to create a comment
    //
    // 2. Need to add http body to request
    //
    // 3. Need to add state so that comment text is updated
    return(
        <>
            <button style={ style } onClick={ handleClick }>Comment</button>
            <br></br>
            <input onChange={(event) => setData(event.target.value)}></input>
            <button onClick={onSubmit}>Post</button>
        </>
    );
}

export default PostCommentButton;
