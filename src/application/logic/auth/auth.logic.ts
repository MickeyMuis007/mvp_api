import colors from "colors";

import { compare } from "bcrypt";

import { IUserModel, UserModel } from "../../../domain/aggregates/user/user.model";

export class AuthLogic {
  public login = async ({ username, password }): Promise<any> => {
    const user = await UserModel.findOne({
      where: {
        username: username
      }
    }) as UserModel;

    if (user && user.isActive) {
      const validPassword = await compare(password, user.password || "");

      if (validPassword) {
        return user.generateAuthToken();
      }
    }
    return "Invalid username or password";
  }

  public register = async (newUser: IUserModel): Promise<any> => {
    try {
      const user = new UserModel(newUser);

      const addedUser = await user.save();
      console.log("Succefully added".green);
      return addedUser;
    } catch (err) {
      console.log(colors.red(err));
      throw err;
    }
  }

  public logout = async (): Promise<any> => {
    return "logout logic";
  }
}
