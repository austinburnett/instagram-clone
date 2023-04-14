// Require middleware: Pull middleware into tests
const setPostId = require("../middleware/setPostId.js");
const isAuthenticated = require("../middleware/isAuthenticated.js").isAuthenticated;
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");

describe("test middleware that set variables on req", () =>{
    let res = {
        status: function(httpStatusCode){
            expect(httpStatusCode).toBe(401);
            return this; // chainable method
        } ,
        send: jest.fn((msg) => msg)
    };
    let req = {
        params: {"id": 12},
        headers: {
            authorization: undefined 
        },
    };
    
    let next = jest.fn();

    beforeEach(() => {
        next.mockClear();
    });

    it("should set post_id on req object and call next() once", () => {
        setPostId(req, res, next);
        expect(req.post_id).toBe(12);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it("should set username on req object and call next() once", () => {
        req.headers["authorization"] = "Bearer tokenId";

        jwt.verify.mockImplementationOnce(() => {
            req.username = "1234";
            next();
        });

        isAuthenticated(req, res, next);
        expect(req.username).toBe("1234");
        expect(next).toHaveBeenCalledTimes(1);
    });

});

describe(("test middleware that doesn't set anything on req"), () => {
    let res = {
        status: function(httpStatusCode){
            expect(httpStatusCode).toBe(401);
            return this; // chainable method
        } ,
        send: jest.fn((msg) => msg)
    };
    let req = {
        params: {"id": 12},
        headers: {
            authorization: undefined 
        },
    };
    
    let next = jest.fn();

    beforeEach(() => {
        next.mockClear();
    });

    it("should set http status code to 401 and set nothing on req", () =>{
        req.headers["authorization"] = "no token";

        isAuthenticated(req, res, next);
        expect(req.username).toBe(undefined);
        expect(next).not.toHaveBeenCalled();
    });

    it("should set http status code to 401 and set nothing on req", () => {
        isAuthenticated(req, res, next);
        expect(req.username).toBe(undefined);
        expect(next).not.toHaveBeenCalled();
    });
});
