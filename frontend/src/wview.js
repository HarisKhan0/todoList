import React from "react";
import "./wview.css";
import calendar from "./CalendarIcon.png";
import addbut from "./AddButton.png";
import { Link } from "react-router-dom";

function Wview() {
  return (
    <div>
      <calendarbox />
      <img className="calendar" src={calendar} alt="logo" />
      <div className="header">
        <h1 className="headtext">Weekly View</h1>
      </div>
      <Link to="/form">
        <calendarboxright />
        <img className="addbut" src={addbut} alt="logo" />
      </Link>
      <div className="daylist">
        <h1>Monday</h1>
        <h1>Tuesday</h1>
        <h1>Wednesday</h1>
        <h1>Thursday</h1>
        <h1>Friday</h1>
        <h1>Saturday</h1>
        <h1>Sunday</h1>
      </div>
      <div className="monlist"></div>
      <div className="tuelist"></div>
      <div className="wedlist"></div>
      <div className="thulist"></div>
      <div className="frilist"></div>
      <div className="satlist"></div>
      <div className="sunlist"></div>
    </div>
  );
}

export default Wview;
