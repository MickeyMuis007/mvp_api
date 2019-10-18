import { SignOptions } from "jsonwebtoken";

export interface IUserAuthToken extends SignOptions {
  _id: string;
  username: string;
  updatedAt: Date;
  iat: number;
}
