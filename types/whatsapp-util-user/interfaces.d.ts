interface UserPayload {
  id: import("mongoose").Schema.Types.ObjectId;
  email: string;
  username: string;
}

declare namespace Express {
  interface Request {
    currentUser?: UserPayload | null;
  }
}
