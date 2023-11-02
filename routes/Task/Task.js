import express from "express";
import {
  deleteTask,
  createTask,
  getTasks,
  getTaskBasedOnId,
  updateTaskCompleted,
  updateTask,
} from "../../services/Task/TaskService.js";
import { validateUser } from "../../auth/Authorize.js";

export default (router) => {
  router.get("/tasks/getAllTasks", validateUser, async (req, res, next) => {
    try {
      const result = await getTasks(req.user);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  router.post("/tasks/createTask", validateUser, async (req, res, next) => {
    const task = req.body;
    try {
      const result = await createTask(task, req.user);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  router.put(
    "/tasks/updateTasksCompleted",
    validateUser,
    async (req, res, next) => {
      const { task_id, completed } = req.body;
      try {
        const result = await updateTaskCompleted(task_id, completed, req.user);
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    }
  );

  router.put("/tasks/updateTasks", validateUser, async (req, res, next) => {
    const { id, task } = req.body;
    try {
      const result = await updateTask(task, id, req.user);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  router.delete(
    "/tasks/deleteTask/:id",
    validateUser,
    async (req, res, next) => {
      const taskId = req.params.id;
      try {
        const result = await deleteTask(taskId, req.user);
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get("/tasks/:id", validateUser, async (req, res, next) => {
    const taskId = req.params.id;
    try {
      const result = await getTaskBasedOnId(taskId, req.user);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });
};
