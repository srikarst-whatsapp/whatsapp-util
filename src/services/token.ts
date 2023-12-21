import jwt from "jsonwebtoken";

const JWT_SECRET = "asdfasdf";

export class Token {
  static tokenizeUser(user: UserPayload) {
    return jwt.sign(
      JSON.stringify({
        id: user.id,
        email: user.email,
        username: user.username,
      }),
      JWT_SECRET
    );
  }
  static decodeToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  }
}
