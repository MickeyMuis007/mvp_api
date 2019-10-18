import jwt from "jsonwebtoken";
import { BOOLEAN, DATE, INTEGER, Model, STRING } from "sequelize";

import sequelize from "../../../infrastructure/dbs/mysql/mysql.connect";

export interface IUserModel {
  id?: number;
  username: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UserModel extends Model {
  public id?: number;
  public username?: string;
  public password?: string;
  public isActive?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;

  public generateAuthToken() {
    const token = jwt.sign({
      id: this.id, username: this.username, isActive: this.isActive,
      createdAt: this.createdAt, updatedAt: this.updatedAt
    },
      "mike",
      { expiresIn: 120 });
    return token;
  }
}

UserModel.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: STRING,
    unique: true
  },
  password: {
    type: STRING
  },
  isActive: BOOLEAN
}, { sequelize, modelName: "user" });
