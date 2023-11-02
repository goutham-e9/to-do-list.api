import express from "express";
import User from "./User/User.js";
import Task from "./Task/Task.js";

const router = express.Router();
export default () => {
  User(router);
  Task(router);
  return router;
};
