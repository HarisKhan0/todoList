const express = require("express");
const cors = require("cors");

const taskServices = require("./models/task-services");
const credentialServices = require("./models/credential-services");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// TODO Gets all credentials
app.get("/credentials", async (req, res) => {
  const username = req.query["username"];
  const password = req.query["password"];
  try {
  // TODO change this to grab credentials
    const result = await credentialServices.getCredentials(username, password);
    res.send({ credential_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

// Gets all tasks
app.get("/tasks", async (req, res) => {
  const name = req.query["task_name"];
  const description = req.query["task_description"];
  try {
    const result = await taskServices.getTasks(name, description);
    res.send({ task_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

// TODO Stores a credential

// Stores a task
app.post("/tasks", async (req, res) => {
  const task = req.body;
  const savedTask = await taskServices.addTask(task);
  if (savedTask) res.status(201).send(savedTask);
  else res.status(500).end();
});

// TODO Deletes a credential with id

// Deletes a task with id
app.delete("/tasks/:id", async (req, res) => {
  const id = req.params["_id"];
  const result = await taskServices.deleteTaskById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.status(204).end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
