import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../";

describe("Error Handler middleware", () => {
  let mockRequest: Partial<Request>;
  let mockError: Partial<Error>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn(function (x) {
        return this as Response;
      }),
      send: jest.fn(),
      json: jest.fn(),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 status by default", async () => {
    errorHandler(
      mockError as Error,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(mockResponse.status).toBeCalledWith(400);
  });

  it("returns error details", async () => {
    mockError = new Error("Test error message");
    errorHandler(
      mockError as Error,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );
    expect(mockResponse.send).toBeCalledWith({
      errors: [{ message: "Something went wrong", err: mockError }],
    });
  });
});
