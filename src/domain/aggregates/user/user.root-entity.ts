import jwt from "jsonwebtoken";
import { Document, Model, model, Schema } from "mongoose";
import { IBase } from "../../shared/entities/base.entity";

export interface IUser extends Document, IBase {
  username: string;
  status: string; // Login or Logout
  roles: string[];
  generateAuthToken();
}

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: Date,
  createdBy: String,
  lastUpdatedAt: Date,
  lastUpdatedBy: String,
  isActive: Boolean
});

UserSchema.pre<IUser>("save", function(next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
    this.createdBy = "Mike";
  }

  if (this.isActive === undefined) {
    this.isActive = false;
  }

  this.lastUpdatedAt = now;
  this.lastUpdatedBy = "Mike";
  next();
});

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, lastUpdatedAt: this.lastUpdatedAt, username: this.username },
    "mike",
    { expiresIn: 120 });
  console.log("token", token);
  return token;
};

export const User: Model<IUser> = model<IUser>("User", UserSchema);
