// import { taskModel } from "../../data/taskModel.js";
import { ApiModelPermissions } from "../../auth/ApiModelPermissions.js";
import db from "../../data/db.js";

export const createTask = async (task, userId) => {
  return new Promise(async (resolve, reject) => {
    const query =
      "insert into Task(task_name,description,due_date,userId) values (?,?,?,?)";
    const values = [task.name, task.description, task.dueDate, userId];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          message: "Task created successfully",
        });
      }
    });
  });
};

export const getTasks = async (userId) => {
  return new Promise(async (resolve, reject) => {
    const query = "select * from Task where userId = ?";
    db.query(query, [userId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        resolve({
          tasks: result,
        });
      }
    });
  });
};

export const getTaskBasedOnId = async (id, userId) => {
  return new Promise((resolve, reject) => {
    const query = "select * from Task where task_id = ? && userId = ?";
    db.query(query, [id, userId], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length == 0) {
        reject({
          statusCode: 400,
          message: "Id not found",
        });
      } else {
        resolve({
          result,
        });
      }
    });
  });
};

export const updateTask = async (task, id, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tasks = await getTaskBasedOnId(id, userId);
      if (!tasks) {
        return reject({
          statusCode: 404,
          message: "Task doesn't exist",
        });
      }
      for (const value in task) {
        if (!ApiModelPermissions["Task"][value]) {
          return reject({
            statusCode: 404,
            message: "TTask doesn't exist",
          });
        }
      }
      const columnNames = Object.keys(task)
        .map((key) => key + "= ?")
        .join(",");
      const query = `update Task set ${columnNames} where task_id = ?`;
      const values = [...Object.values(task), id];
      db.query(query, values, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          resolve({
            message: "Task updated successfully",
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const updateTaskCompleted = async (taskId, completed, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tasks = await getTaskBasedOnId(taskId, userId);
      if (!tasks) {
        return {
          message: "Task doesn't exists",
        };
      }
      const query = "update Task set completed = ? where task_id = ?";
      const values = [completed ? 1 : 0, taskId];
      db.query(query, values, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          resolve({
            message: "Task updated successfully",
          });
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteTask = async (taskId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tasks = await getTaskBasedOnId(taskId, userId);
      if (!tasks) {
        return reject({
          statusCode: 400,
          message: "Task doesn't exist",
        });
      }
      const query = "delete from Task where task_id = ?";
      const values = [taskId];
      db.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            message: "Task deleted successfully ",
          });
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};
