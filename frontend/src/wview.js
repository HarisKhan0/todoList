import React from 'react';
import './wview.css'
import calendar from './CalendarIcon.png'
import addbut from './AddButton.png'


function Wview () {
    return (
        <div>
            <calendarbox />
            <img className="calendar" src={calendar} alt="logo"/>
            <div className= "header">
                <h1 className= "headtext">Weekly View</h1>
            </div>
            <calendarboxright />
            <img className= "addbut" src={addbut} alt="logo"/>
        </div>
    )
};

export default Wview;