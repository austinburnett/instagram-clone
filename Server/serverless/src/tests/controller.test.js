const userController = require("../controllers/userController.js");
const commentController = require("../controllers/commentController.js");
const postController = require("../controllers/postController.js");
const user = require("../models/userModel.js");
const post = require("../models/postModel.js");

jest.mock("../models/postModel.js");
jest.mock("../models/userModel.js");
jest.mock("argon2");

let res = {
    status: function(httpStatusCode){
        expect(httpStatusCode).toBe(201);
        return this; // chainable method
    },
    send: jest.fn((msg) => msg),
    json: jest.fn((user) => user)
};
let req = {
    post_id: 12,
};

describe("test userController functions", () => {

    it("should respond with 201 status on success", async () => {
        await user.find.mockImplementationOnce(() => {
            return true;
        })
        await userController.getUsers(req, res);
    });
});

describe("test commentController functions", () => {
    it("should respond with 201 on success", async () => {
        await post.findById.mockImplementationOnce(() => {
            return req.post_id;
        });
        await commentController.getAllComments(req, res);
    });
});

describe("test postController functions", () => {
    it("should respond with 201 status on success", async () => {
        post.find.mockImplementationOnce(() => {
            return true;
        });

        await postController.getAllPost(req, res);
    });
});
