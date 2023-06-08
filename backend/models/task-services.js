const taskModel = require("./task");

// Gets all tasks in sorted priority
async function getTasks() {
  return await taskModel.find().sort({ priority: -1 });
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

// Group tasks by due date
// async function groupTasksByDueDate() {
//   try {
//     return await taskModel.aggregate([
//       {
//         $group: {
//           _id: {
//             year: { $year: "$days" },
//             month: { $month: "$days" },
//             day: { $dayOfMonth: "$days" },
//           },
//           tasks: { $push: "$$ROOT" },
//         },
//       },
//     ]);
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }

exports.getTasks = getTasks;
exports.addTask = addTask;
exports.deleteTaskById = deleteTaskById;
//exports.groupTasksByDueDate = groupTasksByDueDate;
