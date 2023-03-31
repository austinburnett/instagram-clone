// Require middleware: Pull middleware into tests
const setPostId = require("../middleware/setPostId.js");
const isAuthenticated = require("../middleware/isAuthenticated.js");

describe("test middleware that set variables on req", () =>{
    let req = {"params": {"id": 12}}, res;

    function next(){

    }

    it("should set post_id on req object", () =>{
        setPostId(req, res, next)
        expect(req.post_id).toBe(12);
    });

    it("should set userId on req object", () =>{
        //isAuthenticated(req, res, next)
    })
});
