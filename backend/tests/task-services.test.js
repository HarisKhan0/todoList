const taskServices = require("../models/task-services");
const taskSchema = require("../models/task");
const db = require("./db");

beforeAll(async () => {
  await db.connectTempDataBase();
});

afterEach(async () => {
  await db.clearTempDatabase();
});

afterAll(async () => {
  await db.closeTempDatabase();
});

describe("Task created", () => {
  it("Add task works", async () => {
    const taskInput = {
      user: "Filler User",
      task_name: "Homework",
      task_description: "History",
      days: "2023-06-07T07:00:00.000Z",
      difficulty: 5,
      stress_rating: 5,
    };

    await taskServices.addTask(taskInput);

    const result = await taskServices.getTasks();

    expect(result[0].user).toBe("Filler User");
  });

  it("Add task errors", async () => {
    const taskInput = {
      field: "tree",
    };

    const result = await taskServices.addTask(taskInput);

    expect(result).toBeFalsy();
  });

  it("Delete task by ID works", async () => {
    const taskInput = {
      user: "Filler User",
      task_name: "Homework",
      task_description: "History",
      days: "2023-06-07T07:00:00.000Z",
      difficulty: 5,
      stress_rating: 5,
    };

    await taskServices.addTask(taskInput);

    const tasks = await taskServices.getTasks();

    const firstTask = tasks[0];

    const firstTaskID = firstTask._id;

    const deletedTask = await taskServices.deleteTaskById(firstTaskID);

    expect(firstTask).toEqual(deletedTask);
  });

  it("Delete task by ID errors", async () => {
    const deletedTask = await taskServices.deleteTaskById("1");

    expect(deletedTask).toEqual(undefined);
  });

  it("Days remaining works", async () => {
    const date = new Date();

    const taskInput = {
      user: "Filler User",
      task_name: "Homework",
      task_description: "History",
      days: date,
      difficulty: 5,
      stress_rating: 5,
    };

    await taskServices.addTask(taskInput);

    const tasks = await taskServices.getTasks();

    const firstTask = tasks[0];

    expect(firstTask.days_remaining).toBeCloseTo(0);
  });

  it("Sort priority works", async () => {
    const queryMock = {
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn(),
    };

    taskSchema.find = jest.fn().mockReturnValue(queryMock);
    const mockCallback = jest.fn();

    taskSchema.sortPriority(mockCallback);

    expect(taskSchema.find).toHaveBeenCalledWith({});
    expect(queryMock.sort).toHaveBeenCalledWith({ priority: -1 });
    expect(queryMock.exec).toHaveBeenCalledWith(mockCallback);
  });
});
