import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const PostCommentButton = ({ postId, id }) => {
  const [buttonColor, setButtonColor] = useState("white");
  const [data, setData] = useState(null);
  const [displayStatus, setDisplayStatus] = useState("none");

  let commentButtonStyle = {
    backgroundColor: buttonColor,
    padding: "10px",
  };
  let commentInputStyle = {
    display: displayStatus,
  };

  let request = {
    method: "post",
    baseURL: `http://localhost:3000/posts/${postId}/comments/`,
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
      "Content-Type": "text/plain",
    },
    data: `${data}`,
  };

  let decodedToken = localStorage.jwt;
  try {
    decodedToken = jwtDecode(decodedToken);
  } catch (err) {
    console.log(err);
  }

  function handleClick() {
    setDisplayStatus("inline");
    setButtonColor("green");
  }

  function onSubmit() {
    setDisplayStatus("none");
    setButtonColor("white");

    console.log(data);
    axios(request)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          navigate("/login");
        }
      });

    // Append an li element to ul with comment data
    const commentList = document.getElementById("comments-" + id);
    const li = document.createElement("li");
    li.appendChild(
      document.createTextNode(decodedToken.username + ": " + data),
    );
    commentList.appendChild(li);
  }

  return (
    <>
      <button style={commentButtonStyle} onClick={handleClick}>
        Comment
      </button>
      <br></br>
      <input
        style={commentInputStyle}
        onChange={(event) => setData(event.target.value)}
      ></input>
      <button style={commentInputStyle} onClick={onSubmit}>
        Post
      </button>
    </>
  );
};

export default PostCommentButton;
