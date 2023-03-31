function setPostId(req, res, next){
    console.log("from posts routes middleware", req.params);
    req.post_id = req.params.id
    next();
}

module.exports = setPostId;
