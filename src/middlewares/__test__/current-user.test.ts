import { NextFunction, Request, Response } from "express";
import { currentUser } from "../";
import { Token } from "../../services";
import mongoose from "mongoose";

const testEmail = "testemail@email.com";
const testId = new mongoose.Schema.Types.ObjectId("id");
const testUsername = "test-user-name";

const testUserPayload = {
  email: testEmail,
  id: testId,
  username: testUsername,
};

describe("Authorization middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("has no current user field when there is no session", async () => {
    currentUser(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockRequest.currentUser).toEqual(null);
    expect(nextFunction).toBeCalledTimes(1);
  });

  it("has no current user field when there is no token", async () => {
    currentUser(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockRequest.currentUser).toEqual(null);
    expect(nextFunction).toBeCalledTimes(1);
  });

  it("has null current user field when there is an invalid token", async () => {
    mockRequest = {
      session: {
        jwt: "invalid_token",
      },
    };
    currentUser(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockRequest.currentUser).toEqual(null);
    expect(nextFunction).toBeCalledTimes(1);
  });

  it("has a current user field when there is a valid token", async () => {
    const token = Token.tokenizeUser(testUserPayload);
    mockRequest = {
      session: {
        jwt: token,
      },
    };
    currentUser(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockRequest.currentUser?.email).toEqual(testEmail);
    expect(mockRequest.currentUser?.username).toEqual(testUsername);
    expect(nextFunction).toBeCalledTimes(1);
  });
});
