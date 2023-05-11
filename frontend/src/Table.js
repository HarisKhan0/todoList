import React from 'react'
import {Link} from 'react-router-dom';

function TableHeader()  {
    return (
        <thead>
            <tr>
                <th>Task Name</th>
                <th>Description</th>
                <th>Due In (# of days)</th>
                <th>Task Identifier</th>
            </tr>
        </thead>
    );
}

function TableBody(props) {
    const rows = props.characterData.map(
        (row, index) => {
            return (
                <tr key={index}>
                    <td>{row.task_name}</td>
                    <td>{row.task_description}</td>
                    <td>{row.days}</td>
                    <td>{row._id}</td>
                    <td>
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
        <table>
            <TableHeader />
            <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter} />
            <Link to="/form"><button>Add Person</button></Link>
        </table>
    );
}  

export default Table;
