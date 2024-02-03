function PostImage({ image, postCreatorUri }) {
  return (
    <>
      <a href={`/profile/${postCreatorUri}`}>
        {" "}
        <img src={image}></img>{" "}
      </a>
    </>
  );
}

export default PostImage;
