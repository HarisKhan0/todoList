const mongoose = require("mongoose");
const taskModel = require("./user");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getUsers(task_name, task_description) {
  let result;
  if (task_name === undefined && task_description === undefined) {
    result = await taskModel.find();
  } else if (task_name && !task_description) {
    result = await findUserByName(task_name);
  } else if (task_description && !task_name) {
    result = await findUserByJob(task_description);
  }
  else{
    result = await findUserByNameAndJob(task_name, task_description);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await taskModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findUserByName(name) {
  return await taskModel.find({ task_name: name });
}

async function findUserByJob(job) {
  return await taskModel.find({ task_description: job });
}

async function findUserByNameAndJob(name, job) {
  return await taskModel.find({ task_name: name, description: job });
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

async function deleteUserById(id) {
  try {
    return await taskModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.deleteUserById = deleteUserById;
