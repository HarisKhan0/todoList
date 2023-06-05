const taskServices = require("../models/task-services");
//const task = require("../models/task");
const db = require("./db");

beforeAll(async () => {
  await db.connectTempDataBase();
}, 5000);

afterEach(async () => {
  await db.clearTempDatabase();
}, 5000);

afterAll(async () => {
  await db.closeTempDatabase();
}, 5000);

describe("Task created when", () => {
  it("First task", async () => {
    const taskInput = {
      user: "Filler User",
      task_name: "Homework",
      task_description: "History",
      days: "2023-06-07T07:00:00.000Z",
      difficulty: 5,
      stress_rating: 5,
      priority: 5,
    };

    await taskServices.addTask(taskInput);

    const result = await taskServices.getTasks();

    expect(result[0].user).toBe("Filler User");
  }, 5000);
});
