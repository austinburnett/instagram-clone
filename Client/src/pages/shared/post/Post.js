import React, { useState } from "react";
import { useId } from "react";
import PostLikeButton from "./PostLikeButton.js";
import PostCommentButton from "./PostCommentButton.js";
import PostImage from "./PostImage.js";
import "./post.css";

const Post = ({
  postId,
  postUser,
  postImage,
  postCaption,
  postLikes,
  postComments,
}) => {
  const uid = useId();

  let commentsList = postComments.map((postComments) => (
    <li key={postComments._id}>
      {postComments.username}
      {": "}
      {postComments.text}
    </li>
  ));

  let usersLiked = [];
  postLikes.forEach((like) => {
    usersLiked.push(like.username);
  });

  return (
    <>
      <div className="post">
        <p>{postUser}</p>
        <PostImage image={postImage} postCreatorUri={postUser} />
        <PostLikeButton postId={postId} likes={usersLiked} />
        <PostCommentButton postId={postId} id={uid} />
        <br />
        <p>{postCaption}</p>
        <br />
        <ul id={"comments-" + uid}>{commentsList}</ul>
      </div>
    </>
  );
};

export default Post;
