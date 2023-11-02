import db from "./db.js";

const createTask = async (task) => {
  return new Promise(async (resolve, reject) => {
    const query =
      "insert into Task(task_name,description,due_date) values (?,?,?)";
    const values = [task.name, task.description, task.dueDate];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getTasks = async () => {
  return new Promise(async (resolve, reject) => {
    const query = "select * from Task";
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getTaskBasedOnId = async (id) => {
  return new Promise((resolve, reject) => {
    const query = "select * from Task where task_id = ?";
    db.query(query, [id], (err, result) => {
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

const updateTask = async (task) => {
  return new Promise(async (resolve, reject) => {
    const query =
      "update Task set task_name = ? ,description = ?,due_date = ?) where task_id = ?";
    const values = [task.name, task.description, task.dueDate, task_id];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updateTaskCompleted = async (task, completed) => {
  return new Promise(async (resolve, reject) => {
    const query = "update Task set completed = ? where task_id = ?";
    const values = [completed ? 1 : 0];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          message: "Task updated successfully",
        });
      }
    });
  });
};

const deleteTask = async (task) => {
  return new Promise(async (resolve, reject) => {
    const query = "delete from Task where task_id = ?";
    const values = [task.name, task.description, task.dueDate, task_id];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          message: "Task deleted successfully ",
        });
      }
    });
  });
};

export const taskModel = {
  createTask,
  getTasks,
  getTaskBasedOnId,
  updateTask,
  deleteTask,
};
