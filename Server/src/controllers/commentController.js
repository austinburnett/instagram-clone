const post = require("../models/postModel.js");
const comment = require("../models/commentModel.js");

/*
 // check if validation works
 // match up correct comment in post model - createComment
 */

// Create comment for a given post _id
exports.createComment = async (req, res) => {
    try{
        let currentPost = await post.findById(req.post_id);
        if(currentPost == null){
            throw new Error("Check post id ", req.post_id);
        }
        const newComment = new comment({
            username: req.username,
            text: req.body,
            post_id: req.post_id
        });
        await newComment.save();

        const commentId = await comment.find({ 
            username: `${req.username}`,
            text: `${req.body}`
        });

        currentPost.comments.push(commentId[0]._id);
        await currentPost.save();

        res.status(201).send("Comment created");
    } catch(err){
        console.error(err);
        res.status(404).send("Error with creating comment");
    }
}

// Get all comments for a given post _id
exports.getAllComments = async (req, res) => {
    try{
        const currentPost = await post.findById(req.post_id);
        if(currentPost == null){
            throw new Error("Check post id ", req.post_id);
        }
        res.status(201).json(currentPost.comments);
    } catch(err){
        console.error(err);
        res.status(404).send("Error with retrieving all comments");
    }
}

// Get a comment for a given post _id
exports.getComment = async (req, res) => {
    try{
        const currentPost = await post.findById(req.post_id);
        if(currentPost == null){
            throw new Error("Check post id: " + req.post_id); 
        }

        const comm = await currentPost.comments.id(req.params.id);
        if(comm == null){
            throw new Error("Check comment id: " + req.params.id); 
        }

        res.status(201).json(comm);
    } catch(err){
        console.error(err);
        res.status(404).send("Error retrieving comment");
    }
}

// Update part of comment for a given post w/ _id
// given post id, query 
exports.updateComment = async (req, res) => {
    try{
        const currentPost = await post.findById(req.post_id);
        if(currentPost == null){
            throw new Error("Check post id: " + req.post_id); 
        }

        const currComment = await comment.findOne({_id: req.params.id});

        if(currComment == null){
            throw new Error("Check comment id " + req.params.id);
        }

        currComment.text = req.body; 
        await currComment.save();

        res.status(200).send("Comment updated");
    } catch(err){
        console.error(err);
        res.status(404).send("Error updating comment");
    }
}

// Delete comment on a given post w/ _id
exports.deleteComment = async (req, res) => {
    try{
        const currentPost = await post.findById(req.post_id);
        if(currentPost == null){
            throw new Error("Check post id: " + req.post_id); 
        }
        await currentPost.comments.id(req.params.id).remove();

        await currentPost.save();
        res.status(200).send("Comment deleted");
    } catch(err){
        console.error(err);
        res.status(404).send("Error deleting comment");
    }
}
