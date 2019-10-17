import { BOOLEAN, DATE, INTEGER, Model, STRING } from "sequelize";

import sequelize from "../../../infrastructure/dbs/mysql/mysql.connect";

export class UserModel extends Model { }
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
}, { sequelize, modelName: "user"});
