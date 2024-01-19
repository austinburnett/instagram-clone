import React, { useState } from "react";
import axios from "axios";

const PostCommentButton = ({postId, postUser}) =>{
    const [color, setColor] = useState("white");
    const [data, setData] = useState(null);
    const [displayStatus, setDisplayStatus] = useState("none");

    let style = {
        backgroundColor: color,
        padding: "10px"
    }

    let commentInputStyle = {
        display: displayStatus
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
        setDisplayStatus("inline");
        setColor("green");
    }

    function onSubmit(){
        setDisplayStatus("none");
        setColor("white");

        console.log(data);
        axios(request).then((response) => {
            console.log(response);
        }).catch((err) => {
                if(err.response.status == 401){
                    navigate("/login");
                }
        });

        // Append an li element to ul with comment data
        const commentList = document.getElementById("comments")
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(postUser + ": " + data));
        commentList.appendChild(li);
    }

    // 1. Need to add state so that comment text is updated
    return(
        <>
            <button style={ style } onClick={ handleClick }>Comment</button>
            <br></br>
            <input style={commentInputStyle} onChange={(event) => setData(event.target.value)}></input>
            <button style={commentInputStyle} onClick={onSubmit}>Post</button>
        </>
    );
}

export default PostCommentButton;
