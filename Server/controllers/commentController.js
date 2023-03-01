const post = require("../models/postModel.js");

// Create comment
exports.createComment = async (req, res) => {
    let currentPost = await post.findById(req.post_id);
    // validation does not work 
    currentPost.comments.push({
        user_id: req.username,
        text: req.body,
    });
    await currentPost.save();

    res.status(201).send("Comment created");
}

// Get all comments
exports.getAllComments = async (req, res) => {
    const currentPost = await post.findById(req.post_id);
    res.json(currentPost.comments);
}

// Get single comment
exports.getComment = async (req, res) => {
    const currentPost = await post.findById(req.post_id);
    const comm = await currentPost.comments.id(req.params.id);
    
    res.json(comm);
}

// Update part of comment
exports.updateComment = async (req, res) => {
    const currentPost = await post.findById(req.post_id);
    let comm = await currentPost.comments.id(req.params.id);
    comm.text = req.body; 
    await currentPost.save();
    res.status(200).send("Comment updated");
}

// Delete comment
exports.deleteComment = async (req, res) => {
    const currentPost = await post.findById(req.post_id);
    await currentPost.comments.id(req.params.id).remove();
    
    await currentPost.save();
    res.status(200).send("Comment deleted");
}
