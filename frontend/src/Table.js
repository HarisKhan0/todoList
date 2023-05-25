import React from "react";
import { Link } from "react-router-dom";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Task Name</th>
        <th>Description</th>
        <th>Due Date</th>
        <th>Time Remaining</th>
        <th>Complete?</th>
        <th>Urgency</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    const dueDate = new Date(row.days);
    const formattedDueDate = dueDate.toLocaleDateString("en-US");

    // Calculate the time remaining
    const currentDate = new Date();
    const timeRemaining = Math.ceil(
      (dueDate - currentDate) / (1000 * 60 * 60 * 24)
    );
    const isOverdue = timeRemaining < 0;
    const daysOverdue = Math.abs(timeRemaining);
    const isToday = timeRemaining === 0;
    const isOneDayRemaining = timeRemaining === 1;

    // Apply CSS classes based on overdue status and number of days
    const overdueClassName = isOverdue ? "overdue" : "";
    const daysRemainingClassName =
      isToday || isOneDayRemaining ? "bold-black" : "";
    const handleUrgencyChange = (e) => {
      const updatedCharacters = props.characterData.map((character, i) => {
        if (i === index) {
          return {
            ...character,
            urgency: e.target.value,
          };
        }
        return character;
      });
      props.updateUrgency(updatedCharacters);
    };
    // Determine the CSS class based on urgency value
    let urgencyClass = "";
    if (row.urgency === "low") {
      urgencyClass = "low-urgency";
    } else if (row.urgency === "medium") {
      urgencyClass = "medium-urgency";
    } else if (row.urgency === "high") {
      urgencyClass = "high-urgency";
    } else if (row.urgency === "no") {
      urgencyClass = "no-urgency";
    }

    return (
      <tr key={index} className={urgencyClass}>
        <td>{row.task_name}</td>
        <td>{row.task_description}</td>
        <td>{formattedDueDate}</td>
        <td className={`${overdueClassName} ${daysRemainingClassName}`}>
          {isOverdue ? (
            <strong className="red">{`${daysOverdue} Days Overdue`}</strong>
          ) : isToday ? (
            <strong className="bold-black">Today</strong>
          ) : isOneDayRemaining ? (
            <strong className="bold-black">1 Day</strong>
          ) : (
            <strong className="bold-black">{`${timeRemaining} Days`}</strong>
          )}
        </td>
        <td>
          <input
            type="checkbox"
            checked={row.complete}
            onChange={() => props.toggleComplete(index)}
          />
        </td>
        <td>
          <select value={row.urgency} onChange={handleUrgencyChange}>
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </td>
        <td></td>

        <td>
          <button onClick={() => props.removeCharacter(index)}>
            Remove Task
          </button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
        toggleComplete={props.toggleComplete}
        updateUrgency={props.updateUrgency}
      />
      <Link to="/form">
        <button>Create New Task</button>
      </Link>
    </table>
  );
}

export default Table;
