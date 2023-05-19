import React from "react";
import { Link } from "react-router-dom";

function TaskListHeader() {
  return (
    <thead>
      <tr>
        <th>Task Name</th>
        <th>Description</th>
        <th>Due In (# of days)</th>
        <th>Priority</th>
        <th>User</th>
        <th>Task Identifier</th>
      </tr>
    </thead>
  );
}

function TaskListBody(props) {
  const rows = props.taskData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.task_name}</td>
        <td>{row.task_description}</td>
        <td>{row.days}</td>
        <td>{row.priority}</td>
        <td>{row.user}</td>
        <td>{row._id}</td>
        <td>
          <button onClick={() => props.removeTask(index)}>Remove Task</button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function TaskList(props) {
  return (
    <table>
      <TaskListHeader />
      <TaskListBody taskData={props.taskData} removeTask={props.removeTask} />
      <Link to="/form">
        <button>Create New Task</button>
      </Link>
    </table>
  );
}

export default TaskList;
