import colors from "color";
import jwt from "jsonwebtoken";

import { IUserAuthToken } from "../../application/model/auth/user-auth-token.model";
// import { User } from "../../domain/aggregates/user/user.root-entity";

import { UserModel } from "../../domain/aggregates/user/user.model";

async function authCheck(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access denied. No token provided");
  }

  try {
    const userAuthToken: IUserAuthToken = jwt.verify(token, "mike") as IUserAuthToken;

    const searchUser = await UserModel.findOne({
      where: { username: userAuthToken.username }
    });

    if (searchUser) {
      console.log("Valid login".green);
    } else {
      console.log("User not found or not valid no more".red);
      return res.status(403).send("Forbidden error message.");
    }

    req.user = userAuthToken;
    next();
  } catch (err) {
    res.status(400).send(`Invalid token: ${err.message}`);
  }

}

export default authCheck;
