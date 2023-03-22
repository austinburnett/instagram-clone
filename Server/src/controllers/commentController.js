const post = require("../models/postModel.js");

// Create comment for a given post _id
exports.createComment = async (req, res) => {
    try{
        let currentPost = await post.findById(req.post_id);
        if(currentPost == null){
            throw new Error("Check post id ", req.post_id);
        }
        
        // check if validation works
        await currentPost.comments.push({
            user_id: req.username,
            text: req.body,
        });
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
        res.json(currentPost.comments);
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
exports.updateComment = async (req, res) => {
    try{
        const currentPost = await post.findById(req.post_id);
        if(currentPost == null){
            throw new Error("Check post id: " + req.post_id); 
        }

        let comm = await currentPost.comments.id(req.params.id);
        if(comm == null){
            throw new Error("Check comment id " + req.params.id);
        }
        comm.text = req.body; 
        await currentPost.save();

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
