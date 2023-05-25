const express = require("express");
const cors = require("cors");

const taskServices = require("./models/task-services");
const credentialServices = require("./models/credential-services");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Gets all tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await taskServices.getTasks();
    res.send({ task_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

// Gets all credentials
app.get("/credentials", async (req, res) => {
  try {
    const result = await credentialServices.getCredentials();
    res.send({ credential_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

// Stores a task
app.post("/tasks", async (req, res) => {
  const task = req.body;
  const savedTask = await taskServices.addTask(task);
  if (savedTask) res.status(201).send(savedTask);
  else res.status(500).end();
});

// Stores a credential
app.post("/credentials", async (req, res) => {
  const credential = req.body;
  const savedCredential = await credentialServices.addCredential(credential);
  if (savedCredential) res.status(201).send(savedCredential);
  else res.status(500).end();
});

// Deletes a task with id
app.delete("/tasks/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await taskServices.deleteTaskById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.status(204).end();
  }
});

// TODO test this
// Deletes a credential with id
app.delete("/credentials/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await credentialServices.deleteCredentialById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.status(204).end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
