import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { Token } from "../services";

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    req.currentUser = null;
    return next();
  }

  try {
    const payload = Token.decodeToken(req.session!.jwt);
    req.currentUser = payload;
  } catch (e) {
    console.log(e);
    if (e instanceof JsonWebTokenError) req.currentUser = null;
  }

  next();
};
