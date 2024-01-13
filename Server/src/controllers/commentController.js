const post = require("../models/postModel.js");
const comment = require("../models/commentModel.js");

/*
 * commentController.js
 * @desc Export functions that handles req/res logic for comments 
 * @routeParam id is the unique identifier for a comment
 * @TODO: 
 * check if validation works
 * match up correct comment in post model - createComment
 * fix get comment by id - getComment
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

        const commentId = await comment.findOne({ 
            username: `${req.username}`,
            text: `${req.body}`
        });

        currentPost.comments.push(commentId);
        await currentPost.save();

        res.status(201).send("Comment created");
    } catch(err){
        console.error(err);
        res.status(404).send("Error with creating comment");
    }
}

// Get all comments for a given post _id
// @response array of json objects
exports.getAllComments = async (req, res) => {
    try{
        const currentPost = await post.findById(req.post_id).populate("comments");
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
// @response json object containg comment
exports.getComment = async (req, res) => {
    try{
        const desiredComment = await post.findById(req.post_id).populate({
            path: "comments",
            match: {_id: `${req.params.id}`},
            perDocumentLimit: 1
        });

        if(desiredComment == null){
            throw new Error("Post not found, check post id: " + req.post_id); 
        }
        
        let comment = desiredComment.comments[0];
        
        if(comment == null){
            throw new Error("Check comment id: " + req.params.id); 
        }

        res.status(201).json(comment);
    } catch(err){
        console.error(err);
        res.status(404).send("Error retrieving comment");
    }
}

// Update part of comment for a given post w/ _id
// @response String containing the result of the update operation
exports.updateComment = async (req, res) => {
    try{
        const desiredComment = await post.findById(req.post_id).populate({
            path: "comments",
            match: {_id: `${req.params.id}`},
            perDocumentLimit: 1
        });

        if(desiredComment == null){
            throw new Error("Post not found, check post id: " + req.post_id); 
        }
        
        let comment = desiredComment.comments[0];
        
        if(comment == null){
            throw new Error("Check comment id: " + req.params.id); 
        }

        comment.text = req.body; 

        // Subdocument save won't trigger a save
        // You need to save top level document
        await comment.save();

        res.status(200).send("Comment updated");
    } catch(err){
        console.error(err);
        res.status(404).send("Error updating comment");
    }
}

// Delete comment on a given post w/ _id
// @response Result of comment deletion
exports.deleteComment = async (req, res) => {
    try{

        const currComment = await comment.findById(req.params.id);

        const currPost = await post.findById(req.post_id).populate({
            path: "comments",
        });

        if(currPost == null || currComment == null){
            throw new Error(`Post or comment not found, \
                post_id: ${req.post_id} \n comment_id: ${req.params.id}`); 
        }
        
        console.log(currComment)

        // Refernced docs are just typical documents
        // calling remove/save methods will remove them from db
        currComment.delete();

        await currPost.comments.pull({ _id: req.params.id });
        await currPost.save();

        res.status(200).send("Comment deleted");
    } catch(err){
        console.error(err);
        res.status(404).send("Error deleting comment");
    }
}
