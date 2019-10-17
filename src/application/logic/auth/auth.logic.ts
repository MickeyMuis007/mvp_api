import colors from "colors";

import { IUser, User } from "../../../domain/aggregates/user/user.root-entity";

export class AuthLogic {
  public login = async ({username}): Promise<any> => {
    const userFound = await User.findOne({ username: username });
    if (userFound) {
      await userFound.save();
      const token = userFound.generateAuthToken();
      return token;
    }
    return "Not found";
  }

  public register = async (newUser: IUser): Promise<any> => {
    try {
      const user = new User(newUser);

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
