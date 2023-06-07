const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true,
    },
    task_name: {
      type: String,
      required: true,
      trim: true,
    },
    task_description: {
      type: String,
      required: true,
      trim: true,
    },
    days: {
      type: Date,
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
    priority: {
      type: Number,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
  },
  { collection: "task_list" }
);

TaskSchema.virtual("days_remaining").get(function () {
  const currentTimestamp = new Date();
  const dueTimestamp = this.due_date.getTime();
  const remainingTime = dueTimestamp - currentTimestamp.getTime();
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  return remainingDays;
});

TaskSchema.pre("save", function (next) {
  this.priority = this.calculatePriority();
  next();
});

// TaskSchema.methods.calculatePriority = function () {
//   return this.difficulty + this.stress_rating - this.days_remaining;
// };
TaskSchema.methods.calculatePriority = function () {
  const currentTimestamp = new Date();
  const dueTimestamp = this.days.getTime();
  const remainingTime = dueTimestamp - currentTimestamp.getTime();
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  const stressFactor = 1; // Adjust this factor to control the impact of stress rating
  const difficultyFactor = 1; // Adjust this factor to control the impact of difficulty rating
  const daysWeight = 0.5; // Adjust this weight to amplify the impact of remaining days

  const priority = this.stress_rating * stressFactor + this.difficulty * difficultyFactor - remainingDays * daysWeight;
  return priority;
};


TaskSchema.statics.sortPriority = function (callback) {
  return this.find({}).sort({ priority: -1 }).exec(callback);
};

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
