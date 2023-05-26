const mongoose = require("mongoose");
const taskModel = require("./task");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1/tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

// Gets all tasks in sorted priority
async function getTasks() {
  return await taskModel.find().sort({ priority: -1 });
}

// Return a task with id
async function findTaskById(id) {
  try {
    return await taskModel.findTaskById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
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
