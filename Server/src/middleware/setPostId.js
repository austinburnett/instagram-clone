function setPostId(req, res, next){
    console.log("from setPostId middleware", req.params);
    req.post_id = req.params.id
    next();
}

module.exports = setPostId;
