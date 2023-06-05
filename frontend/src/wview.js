import React from "react";

const calendarStyle = {
  fontFamily: "Arial, sans-serif",
  margin: "0 auto", // Center the calendar horizontally
  height: "90vh", // Set height to 90% of the viewport height
  width: "90vw", // Set width to 90% of the viewport width
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
};

const weekStyle = {
  padding: "0",
  display: "flex",
  gap: "10px",
  height: "calc(100% - 40px)", // Subtract header and margin height
};

const dayStyle = {
  flex: "1",
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
  padding: "10px",
  border: "1px solid #ccc",
  backgroundColor: "#f5f5f5",
  boxShadow: "0 0 5px rgba(0, 0, 0, 1)", // Add box shadow to create an outline
};

const dayTextStyle = {
  fontSize: "18px", // Increase the font size
  textAlign: "center", // Center the day text
};

const taskStyle = {
  marginLeft: "0",
  padding: "10px",
  borderRadius: "4px",
  marginBottom: "4px", // Add a little distance between each task
  textAlign: "left", // Align tasks to the left
  width: "100%", // Make tasks stretch to the width of the box
  boxSizing: "border-box", // Include padding within the width
};

const WeeklyViewCalendar = ({ taskData }) => {
  const [currentWeek, setCurrentWeek] = React.useState(new Date());

  const prevWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const nextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const weekDays = [];
  const weekStart = new Date(currentWeek);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(weekStart);
    currentDate.setDate(currentDate.getDate() + i);
    weekDays.push(currentDate);
  }

  return (
    <div style={calendarStyle}>
      <div style={headerStyle}>
        <button onClick={prevWeek}>Previous Week</button>
        <h1>
          Week of {weekStart.toDateString()} - {weekEnd.toDateString()}
        </h1>
        <button onClick={nextWeek}>Next Week</button>
      </div>
      <ul style={weekStyle}>
        {weekDays.map((day) => {
          const dayTasks = taskData.filter(
            (task) =>
              new Date(task.days).toISOString().slice(0, 10) ===
              day.toISOString().slice(0, 10)
          );
          return (
            <li key={day.toDateString()} style={dayStyle}>
              <strong style={dayTextStyle}>
                {day.toLocaleDateString(undefined, { weekday: "long" })}
              </strong>
              <ul>
                {dayTasks.map((task, index) => (
                  <li key={index} style={taskStyle}>
                    <strong>{task.task_name}</strong>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WeeklyViewCalendar;
