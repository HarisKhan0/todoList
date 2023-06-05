import React from "react";

const calendarStyle = {
  fontFamily: "Arial, sans-serif",
  margin: "0 auto", // Center the calendar horizontally
  height: "90vh", // Set height to 100% of the viewport height
  width: "90vw", // Set width to 100% of the viewport width
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
  //   borderRadius: "4px",
  //   marginBottom: "4px", // Add a little distance between each task
  textAlign: "left", // Align tasks to the left
  width: "100%", // Make tasks stretch to the width of the box
  //   boxSizing: "border-box", // Include padding within the width
  //   display: "flex", // Use flexbox to align items
  justifyContent: "start", // Align items to the left
};

class WeeklyViewCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeek: new Date(),
      tasks: [
        { date: "2023-06-05", tasks: ["Task 1", "Task 2"] },
        { date: "2023-06-06", tasks: ["Task 3"] },
        { date: "2023-06-07", tasks: [] },
        { date: "2023-06-08", tasks: ["Task 4"] },
        { date: "2023-06-09", tasks: [] },
        { date: "2023-06-10", tasks: [] },
        { date: "2023-06-11", tasks: [] },
      ],
    };
  }

  prevWeek = () => {
    const { currentWeek } = this.state;
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    this.setState({ currentWeek: prevWeek });
  };

  nextWeek = () => {
    const { currentWeek } = this.state;
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    this.setState({ currentWeek: nextWeek });
  };

  render() {
    const { currentWeek, tasks } = this.state;
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
          <button onClick={this.prevWeek}>Previous Week</button>
          <h1>
            Week of {weekStart.toDateString()} - {weekEnd.toDateString()}
          </h1>
          <button onClick={this.nextWeek}>Next Week</button>
        </div>
        <ul style={weekStyle}>
          {weekDays.map((day) => {
            const dayTasks = tasks.find(
              (task) => task.date === day.toISOString().slice(0, 10)
            );
            return (
              <li key={day.toDateString()} style={dayStyle}>
                <strong style={dayTextStyle}>
                  {day.toLocaleDateString(undefined, { weekday: "long" })}
                </strong>
                <ul>
                  {dayTasks &&
                    dayTasks.tasks.map((task, index) => (
                      <li key={index} style={taskStyle}>
                        {task}
                      </li>
                    ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default WeeklyViewCalendar;
