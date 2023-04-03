const userController = require("../controllers/userController.js");
const user = require("../models/userModel.js");

jest.mock("../models/userModel.js");
jest.mock("argon2");

describe("test userController functions", () => {
    let res = {
        status: function(httpStatusCode){
            expect(httpStatusCode).toBe(201);
            return this; // chainable method
        } ,
        send: jest.fn((msg) => msg),
        json: jest.fn((user) => user)
    };
    let req = {
        params: {"id": 12},
        headers: {
            authorization: undefined 
        },
    };

    it("should respond with 201 status on success", async() => {
        await user.find.mockImplementationOnce(() => {
            return true;
        })
        await userController.getUsers(req, res);
    });
})
