const mongoose = require("mongoose");
const taskModel = require("./task");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1/tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

//async function getTasks(task_name, task_description) {
//  let result;
//  if (task_name === undefined && task_description === undefined) {
//    result = await taskModel.find().sort({ priority: -1 });
//  } else if (task_name && !task_description) {
//    result = await findTaskByName(task_name);
//  } else if (task_description && !task_name) {
//    result = await findTaskByDescription(task_description);
//  } else {
//    result = await findTaskByNameAndDescription(task_name, task_description);
//  }
//  return result;
//}

async function getTasks(task_name, task_description) {
  let result;
  if (task_name === undefined && task_description === undefined) {
    result = await taskModel.find().sort({ priority: -1 });
  } else if (task_name && !task_description) {
    result = await findTaskByName(task_name);
  } else if (task_description && !task_name) {
    result = await findTaskByDescription(task_description);
  } else {
    result = await findTaskByNameAndDescription(task_name, task_description);
  }
  return result;
}

async function findTaskById(id) {
  try {
    return await taskModel.findTaskById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findTaskByName(task_name) {
  return await taskModel.find({ task_name: task_name });
}

async function findTaskByDescription(task_description) {
  return await taskModel.find({ task_description: task_description });
}

async function findTaskByNameAndDescription(task_name, task_description) {
  return await taskModel.find({
    task_name: task_name,
    description: task_description,
  });
}

async function addTask(task) {
  try {
    const taskToAdd = new taskModel(task);
    const savedTask = await taskToAdd.save();
    return savedTask;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteTaskById(id) {
  try {
    return await taskModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

exports.getTasks = getTasks;
exports.findTaskById = findTaskById;
exports.addTask = addTask;
exports.deleteTaskById = deleteTaskById;
