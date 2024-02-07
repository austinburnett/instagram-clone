import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./create-post.css";

const CreatePost = () => {
  let decodedToken = localStorage.jwt;
  try {
    decodedToken = jwtDecode(decodedToken);
  } catch (err) {
    console.log(err);
  }
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  function handleSubmit(formEvent) {
    formEvent.preventDefault();

    const data = {
      username: decodedToken.username,
      caption: caption,
      image: image,
      likes: [],
      comments: [],
    };
    console.log(data);

    let request = {
      method: "post",
      baseURL: "http://localhost:3000/posts",
      headers: { Authorization: `Bearer ${localStorage.jwt}` },
      data: {
        username: `${data.username}`,
        caption: `${data.caption}`,
        image: `${data.image}`,
      },
    };
    console.log(request);

    axios(request)
      .then(function (response) {
        if (response.status == 201) {
          setAlert("");
          navigate(`/profile/${data.username}`);
        } else {
          setAlert("Some error.");
        }
      })
      .catch((err) => {
        setAlert("Server error: Unable to create post.");
        console.error(err);
      });
  }
  return (
    <main>
      <div className="create-post">
        <div className="logo"></div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            onChange={(event) => setCaption(event.target.value)}
            placeholder="Caption"
          ></input>
          <input onChange={(event) => setImage(event.target.value)}></input>
          <button>Create Post</button>
          <p>{alert}</p>
        </form>
      </div>
    </main>
  );
};

// Register is entrypoint
export default CreatePost;
