const taskModel = require("./task");
const credentialModel = require("./credential");

// Gets all tasks in sorted priority
async function getTasks() {
  return await taskModel.find().sort({ priority: -1 });
}

async function addTask(task) {
  try {
    const user = await credentialModel.findOne({ username: task.user });
    if (!user) {
      throw new Error("User not found.");
    }

    const taskToAdd = new taskModel.Task({
      user: user._id,
      task_name: task.task_name,
      task_description: task.task_description,
      days: task.days,
      difficulty: task.difficulty,
      stress_rating: task.stress_rating,
      priority: task.priority,
      color: task.color,
    });

    const savedTask = await taskToAdd.save();

    // Update the user's tasks array
    user.tasks.push(savedTask._id);
    await user.save();

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
exports.addTask = addTask;
exports.deleteTaskById = deleteTaskById;