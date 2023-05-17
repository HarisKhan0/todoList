import React, { useState } from "react";
import { Link } from "react-router-dom";

function Form(props) {
  //new task object
  const [Task, setTask] = useState({
    task_name: "",
    task_description: "",
    days: "",
    difficulty: "",
    stress_rating: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "task_name") {
      setTask({
        ...Task,
        task_name: value,
      });
    } else if (name === "task_description") {
      setTask({
        ...Task,
        task_description: value,
      });
    } else if (name === "days") {
      setTask({
        ...Task,
        days: value,
      });
    } else if (name === "difficulty") {
      setTask({
        ...Task,
        difficulty: value,
      });
    } else if (name === "stress_rating") {
      setTask({
        ...Task,
        stress_rating: value,
      });
    }
  }

  function submitForm(event) {
    event.preventDefault();
    props.handleSubmit(Task);
    setTask({
      name: "",
      description: "",
      days: 0,
      difficulty: 0,
      stress_rating: 0,
    });
  }

  return (
    <form>
      <label htmlFor="task_name">Task Name</label>
      <input
        type="text"
        name="task_name"
        id="task_name"
        value={Task.name}
        onChange={handleChange}
      />
      <label htmlFor="task_description">Task Description</label>
      <input
        type="text"
        name="task_description"
        id="task_description"
        value={Task.description}
        onChange={handleChange}
      />
      <label htmlFor="days">
        How many days is the task due in/when would you like to have this done?
      </label>
      <input
        type="text"
        name="days"
        id="days"
        value={Task.days}
        onChange={handleChange}
      />

      <label htmlFor="difficulty">
        How important is this task on a scale of 1 to 10?
      </label>
      <input
        type="text"
        name="difficulty"
        id="difficulty"
        value={Task.difficulty}
        onChange={handleChange}
      />
      <label htmlFor="stress_rating">
        How stressed is this task making you feel on a scale of 1 to 10?
      </label>
      <input
        type="text"
        name="stress_rating"
        id="stress_rating"
        value={Task.stress_rating}
        onChange={handleChange}
      />

      <input
        type="button"
        value="Add Task"
        onClick={(event) => submitForm(event)}
      />
      <Link to="/table">
        <button>View Todo List</button>
      </Link>
    </form>
  );
}

export default Form;
