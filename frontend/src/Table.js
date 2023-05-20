import React from 'react'
import {Link} from 'react-router-dom';
import './Table.css'

function TableHeader()  {
    return (
        <thead>
            <tr>
                <th className= "tableheader">Task Name</th>
                <th className= "tableheader">Description</th>
                <th className= "tableheader">Due In (# of days)</th>
            </tr>
        </thead>
    );
}

function TableBody(props) {
    const rows = props.characterData.map(
        (row, index) => {
            return (
                <tr key={index}>
                    <td className= "tableelem">{row.task_name}</td>
                    <td className= "tableelem">{row.task_description}</td>
                    <td className= "tableelem">{row.days}</td>
                    <td className= "tableelem">
                        <button onClick={() => props.removeCharacter(index)}>Remove Task</button>
                    </td>
                </tr>
            );
        }
    );
    return (
        <tbody>
            {rows}
        </tbody>
    );
}

function Table (props) {
    return (
        <div className = "Table">
            <h1 className= "title">Task Homescreen</h1>
            <button className= "buttonleft" 
            onClick={event =>  window.location.href='/wview'}> 
                <h1 className= "buttontext"> Weekly View </h1>
            </button>
            <button className= "buttonleft" 
            onClick={event =>  window.location.href='/mview'}> 
                <h1 className= "buttontext"> Monthly View </h1>
            </button>
            <table>
                <TableHeader />
                <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter} />
                <Link to="/form"><button>Create New Task</button></Link>
            </table>
        </div>
    );
}

export default Table;