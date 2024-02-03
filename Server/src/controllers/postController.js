const formidable = require("formidable");
const post = require("../models/Post");

/**
 * postController.js
 * @desc Export functions that handles req/res logic for posts 
 * @TODO: 
 * post can be created with empty fields - createPost
 * Need to verify if post with id exists - getPost
 * app crashes when given wrong id - getPost
 * verify found post is not null - likePost
 * check if user matches post owner
 */ 

// Create Post
exports.createPost = (req, res) => {
    const form = formidable();
    form.parse(req, async (formErr, fields) => {
        if(formErr) {
            console.error(formErr);
        }

        try {
            const newPost = new post({
                username: req.username,
                image: `${ fields.image }`,
                caption: `${ fields.caption }`,
            });

            res.status(201).json("Post created");
            await newPost.save();

        } catch(err) {
            console.error(err);
            res.status(404).json("Error creating post");
        }
    });
}

// Get Post by id
exports.getPost = async (req, res) => {
    try{
        const currPost = await post.findById(req.params.id).populate("comments");
        if(currPost == null){
            throw new Error("Check post id " + req.params.id);
        }
        res.status(200).json({ currPost });
    }catch(err){
        console.error(err);
        res.status(404).json("Error getting post");
    } 
}

// Get All Posts
exports.getAllPost = async (req, res) => {
    try{
        let posts = null;
        if(req.query.username != null){
            query = { username: req.query.username }
            posts = await post.find(query).populate("comments");
        }
        else{posts = await post.find().populate("comments");}

        if(posts == null){
            throw new Error("Error retrieving posts");
        }
        res.status(200).json({ posts });
    } catch(err){
        console.error(err);
        res.status(404).json("Error getting all posts");
    }
}

// Update a part of the Post
exports.updatePost = async (req, res) => {
  const form = formidable();
  form.parse(req, async (formErr, fields) => {
    if(formErr) {
      console.err(formErr);
      return;
    }
    
    try {
        post.findByIdAndUpdate(req.params.id, {
            image: `${ fields.content }`,
            caption: `${ fields.caption }`,
        }, (err, result) => {
            if(err){
                console.error(err);
            }
            else if(result == null){
                res.status(404).json("Error updating post");
                throw new Error("Error with updating post with id: " + req.params.id);
            }
            else{
                res.status(201).json("Post updated");
            }
        });
    } catch(err) {
      console.error(err);
      res.status(404).json("Error updating post");
    }
  });
}

// Delete Post
exports.deletePost = async (req, res) => {
    try{
        // need to check if post was actually found
        const deletedPost = await post.findByIdAndDelete(req.params.id);
        if(deletedPost == null){
            throw new Error("Error deleting post, check id: " + req.params.id);
        }

        res.status(200).json("Post deleted");
    }catch(err){
        console.error(err);
        res.status(404).json("Error with deleting post");
    } 
}

// Like Post
exports.likePost = async (req, res) => {
    try{
        post.findOne({
            _id: req.params.id
        }, async (err, result) => {
            if(err){
                console.error(err);
            }
            else if(result == null){
                res.status(404).json("Error liking post");
                throw new Error("Error liking post, check id: " + req.params.id);
            }
            let isLiked = 0;
            for(i = 0; i < result.likes.length; i++){
                if(req.username == result.likes[i].username){
                    console.log("matched")
                    isLiked = 1;
                    result.likes.id(result.likes[i].id).remove();
                    break;
                }
            }
            if(!isLiked){
                result.likes.push({
                    username: `${req.username}`
                });
            }
            await result.save();
            res.status(201).json("Post likes updated");
        });
    } catch(err){
        console.error(err);
        res.status(404).json("Error with post like");
    } 
}
