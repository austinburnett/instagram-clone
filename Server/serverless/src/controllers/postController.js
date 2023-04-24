const formidable = require("formidable");
const post = require("../models/postModel");
const postDb = [
    {
        _id: "ObjectId('62e09a8bd3aef3a63d788f)",
        title: "This is another test title",
        user_id: "ObjectId('62e09a8bd3aef3a63d788f)",
        content: "<image here>",
        caption: "This is my image caption!!",
        meta: {
            votes: 2,
            voters: [],
            date: "2023-03-02T21:59:41.334+00:00"
        },
        comments: []
    },
    {
        _id: "ObjectId('62e09a8bd3aef3a63d788f)",
        title: "This is a test title",
        user_id: "ObjectId('62e09a8bd3aef3a63d788f)",
        content: "<image here>",
        caption: "This is a image caption!!",
        meta: {
            votes: 1,
            voters: [],
            date: "2023-03-02T21:59:41.334+00:00"
        },
        comments: []
    },
];

/**
 * postController.js
 * @desc Export functions that handles req/res logic for posts 
 */ 

// Create Post
exports.createPost = (req, res) => {
    const form = formidable();
    form.parse(req, async (formErr, fields) => {
        if(formErr) {
            console.error(formErr);
        }

        try {
            // Need validation, post can be created with empty fields
            const newPost = new post({
                title: `${ fields.title }`,
                user_id: req.username,
                content: `${ fields.content }`,
                caption: `${ fields.caption }`,
            });

            res.status(201).send("Post created");
            await newPost.save();

        } catch(err) {
            console.error(err);
            res.status(500).send("Error creating post");
        }
    });
}

// Get Post by id
exports.getPost = async (req, res) => {
    /*
    try{
        const currPost = await post.findById(req.params.id);
        if(currPost == null){
            throw new Error("Check post id " + req.params.id);
        }
        res.status(201).json({ currPost });
    }catch(err){
        console.error(err);
        res.status(404).send("Error getting post");
    } */
    res.status(201).json({ postDb } + req.params.id);
}

// Get All Posts
exports.getAllPost = async (req, res) => {
    /*
    try{
        const posts = await post.find();
        if(posts == null){
            throw new Error("Error retrieving posts");
        }

        res.status(201).json({ posts });
    } catch(err){
        console.error(err);
        res.status(404).send("Error getting all posts");
    }*/
    res.status(201).json({ postDb });
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
        // Need to verify if post with id exists
        // app crashes when given wrong id
        post.findByIdAndUpdate(req.params.id, {
            // Needs callback to execute 
            title: `${ fields.title }`,
            content: `${ fields.content }`,
            caption: `${ fields.caption }`,
        }, (err, result) => {
            if(err){
                console.error(err);
            }
            else if(result == null){
                res.status(404).send("Error updating post");
                throw new Error("Error with updating post with id: " + req.params.id);
            }
            else{
                res.status(201).send("Post updated");
            }
        });
    } catch(err) {
      console.error(err);
      res.status(500).send("Error updating post");
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

        res.status(200).send("Post deleted");
    }catch(err){
        console.error(err);
        res.status(404).send("Error with deleting post");
    } 
}

// Upvote Post
exports.upvote = async (req, res) => {
    try{
        // verify found post is not null
        post.findOne({
            _id: req.params.id
        }, async (err, result) => {
            if(err){
                console.error(err);
            }
            else if(result == null){
                res.status(404).send("Error upvoting post");
                throw new Error("Error upvoting post, check id: " + req.params.id);
            }

            let voters = result.meta.upvotes.voters;
            let foundUser = 0;
            for(voter in voters){
                if(voters[voter] == req.username){
                    foundUser = 1;
                }
            }
            
            if(foundUser){
                result.meta.upvotes.votes -= 1;
                result.meta.upvotes.voters.pull(req.username);
            }
            else{
                result.meta.upvotes.votes += 1;
                result.meta.upvotes.voters.push(req.username);
            }

            await result.save();
            res.status(200).send("Post upvotes updated");
        });
    } catch(err){
        console.error(err);
        res.status(404).send("Error with post upvote");
    } 
}
