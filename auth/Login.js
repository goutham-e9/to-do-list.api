import { getUserBasedOnId } from "../services/User/UserService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const userLogin = async (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await getUserBasedOnId(username);
      if (user) {
        const verified = await bcrypt.compare(password, user.password);
        if (verified) {
          const token = jwt.sign(
            { user: username, id: user.user_id },
            "secret_key"
          );
          resolve({
            data: token,
            message: "Logged In",
          });
        } else {
          reject({
            statusCode: 400,
            message: "Password is incorrect",
          });
        }
      } else {
        reject({
          statusCode: 400,
          message: "Username is incorrect",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
