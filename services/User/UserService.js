import mysql from "mysql";
import db from "../../data/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = req.body;
      const user = await getUserBasedOnId(username);
      if (user) {
        resolve({
          statusCode: 400,
          message: "User already exists",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertDataQuery =
          "insert into User (username,password) values (?,?)";
        db.query(insertDataQuery, [username, hashedPassword], (err, result) => {
          if (err) {
            reject(err);
          } else {
            const token = jwt.sign({ user: username }, "secret_key");
            resolve({
              data: token,
              message: "User added successfully",
            });
          }
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const getUserBasedOnId = async (id) => {
  return new Promise((resolve, reject) => {
    const selectQuery = "select * from User where username = ?";
    db.query(selectQuery, id, (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result && result.length > 0) {
        resolve(result[0]);
      } else {
        resolve(null);
      }
    });
  });
};
