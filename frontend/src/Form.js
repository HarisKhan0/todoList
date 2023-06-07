import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./Form.css";

function Form(props) {
  const storedData = localStorage.getItem("currentUser");
  const currentUser = storedData ? JSON.parse(storedData) : "defaultValue";

  const [task, setTask] = useState({
    user: currentUser,
    task_name: "",
    task_description: "",
    days: "",
    difficulty: 0,
    stress_rating: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setTask({
      ...task,
      [name]: value,
    });
  }

  // this is used for the react-datepicker
  function handleDateChange(date) {
    const days = date ? formatDate(date) : "";
    setTask({
      ...task,
      days,
    });
  }

  // this is because the backend expects a string for the date
  function formatDate(date) {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    if (month.length === 1) {
      month = "0" + month;
    }

    if (day.length === 1) {
      day = "0" + day;
    }

    return `${month}/${day}/${year}`;
  }

  function submitForm(event) {
    event.preventDefault();
    props.handleSubmitTask(task);
    setTask({
      user: "Filler User",
      task_name: "",
      task_description: "",
      days: "",
      difficulty: 0,
      stress_rating: 0,
    });
  }

  // this adds tick marks to the sliding bar
  function generateTickMarks(min, max, step) {
    const tickMarks = [];

    for (let i = min; i <= max; i += step) {
      tickMarks.push(i);
    }

    return tickMarks;
  }

  const tickMarks = generateTickMarks(1, 10, 1);

  return (
    <body>
      <form>
        <label htmlFor="task_name">Task Name</label>
        <input
          type="text"
          name="task_name"
          id="task_name"
          value={task.task_name}
          onChange={handleChange}
        />
        <label htmlFor="task_description">Task Description</label>
        <textarea
          name="task_description"
          id="task_description"
          value={task.task_description}
          onChange={handleChange}
          rows={4}
        />

        <label htmlFor="days">Task Due Date</label>
        <DatePicker
          name="days"
          id="days"
          selected={task.days ? new Date(task.days) : null}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          className="date-picker"
        />

        <label htmlFor="difficulty">
          How important is this task on a scale of 1 to 10?
        </label>
        <input
          type="range"
          name="difficulty"
          id="difficulty"
          min="1"
          max="10"
          step="1"
          value={task.difficulty}
          onChange={handleChange}
          list="difficulty-tick-marks"
        />
        <datalist id="difficulty-tick-marks">
          {tickMarks.map((tick) => (
            <option key={tick} value={tick} />
          ))}
        </datalist>
        <div className="tick-marks">
          {tickMarks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        <label htmlFor="stress_rating">
          How stressed is this task making you feel on a scale of 1 to 10?
        </label>
        <input
          type="range"
          name="stress_rating"
          id="stress_rating"
          min="1"
          max="10"
          step="1"
          value={task.stress_rating}
          onChange={handleChange}
          list="stress-rating-tick-marks"
        />
        <datalist id="stress-rating-tick-marks">
          {tickMarks.map((tick) => (
            <option key={tick} value={tick} />
          ))}
        </datalist>
        <div className="tick-marks">
          {tickMarks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        <div className="button-container">
          <input
            type="button"
            value="Add Task"
            onClick={(event) => submitForm(event)}
          />
          <Link to="/TaskList">
            <button>View Todo List</button>
          </Link>
        </div>
      </form>
    </body>
  );
}

export default Form;
