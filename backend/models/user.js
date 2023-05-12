const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task_name: {
      type: String,
      required: true,
      trim: true,
    },
    task_description: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error("Invalid job, must be at least 2 characters.");
      },
    },
    days: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    stress_rating: {
      type: Number,
      required: true,
    },
  },
  { collection: "task_list" }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
