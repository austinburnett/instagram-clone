import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Banner from "../shared/banner/Banner.js";
import CreatePostButton from "./CreatePostButton.js";
import PostImage from "../shared/post/PostImage.js";
import createRequestConfig from "../shared/post/createRequestConfig.js";
import "./profile.css";

const Profile = () => {
  const [posts, setPosts] = useState(null);
  const [displayStatus, setDisplayStatus] = useState("none");
  const navigate = useNavigate();
  const params = useParams();

  let decodedToken = localStorage.jwt;
  try {
    decodedToken = jwtDecode(decodedToken);
  } catch (err) {
    console.log(err);
  }

  const createPostButtonStyle = {
    display: displayStatus,
  };

  const request = createRequestConfig("get", `posts?username=${params.userId}`);

  if (posts == null) {
    axios
      .request(request)
      .then((response) => {
        const postDataList = response.data.posts;

        const postList = postDataList.map((postDataList) => (
          <PostImage
            image={postDataList.image}
            postCreatorUri={postDataList.username}
            key={postDataList._id}
          />
        ));
        setPosts(postList);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          navigate("/login");
        }
      });
  }

  if (displayStatus == "none" && params.userId == decodedToken.username) {
    setDisplayStatus("block");
  }

  return (
    <>
      <Banner />
      <main className="profile-wrapper">
        <div className="profile">
          <h1>{params.userId}</h1>
          <div style={createPostButtonStyle}>
            <CreatePostButton />
          </div>
          <div className="post-images">
            {posts}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
