import React from "react";
import { Link } from "react-router-dom";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Task Name</th>
        <th>Description</th>
        <th>Due In (# of days)</th>
        <th>Task Identifier</th>
        <th>Complete?</th>
        <th>Urgency</th>
      </tr>
    </thead>
  );
}

// added feature for checkbox
function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    // let
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
        <td>{row.days}</td>
        <td>{row._id}</td>
        <td>
          <input
            type="checkbox"
            checked={row.complete}
            onChange={() => props.toggleComplete(index)}
          />
        </td>
        <td>
          <select value={row.urgency} onChange={handleUrgencyChange}>
            <option value="none">Reset</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </td>
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
