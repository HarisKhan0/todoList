const express = require('express');
const cors = require('cors');

const userServices = require('./models/user-services');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    const name = req.query['name'];
    const description = req.query['description'];
    try {
        const result = await userServices.getTasks(name, description);
        res.send({task_list: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.get('/users/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await userServices.findById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        res.send({task_list: result});
    }
});

app.post('/users', async (req, res) => {
    //adding task 
    const task = req.body;
    //should work?
    const savedTask = await userServices.addTask(task);
    if (savedTask)
        res.status(201).send(savedTask);
    else
        res.status(500).end();
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await userServices.deleteTaskById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        res.status(204).end();
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
