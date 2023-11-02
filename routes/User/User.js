import express from "express";
import { createUser } from "../../services/User/UserService.js";
import { userLogin } from "../../auth/Login.js";

export default (router) => {
  router.post("/signup", async (req, res, next) => {
    try {
      const result = await createUser(req);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const result = await userLogin(username, password);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });
};
