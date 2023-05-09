import React, {useState} from 'react';

function Form(props) {

  //new task object 
  const [Task, setTask] = useState(
        {
            name: "",
            description: "",
            days: "",
            difficulty: "",
            stress_rating: "",
        }
    );

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "description")
            setTask(
                {name: Task['name'], description: value}
            );
        else     
            setTask(
                {name: value, description: Task['description']}   
            );
    }
    function submitForm() {
        props.handleSubmit(Task);
        setTask({name: '', description: '', days: '', difficulty: '', stress_rating: ''});
    }

    return (
        <form>
        <label htmlFor="name">Task Name</label>
        <input
            type="text"
            name="name"
            id="name"
            value={Task.name}
            onChange={handleChange} />
        <label htmlFor="description">Task Description</label>
        <input
            type="text"
            name="description"
            id="description"
            value={Task.description}
            onChange={handleChange} />
        <label htmlFor="days">How many days is the task due in/when would you like to have this done?</label>
        <input
            type="text"
            name="days"
            id="days"
            value={Task.days}
            onChange={handleChange} />  

        <label htmlFor="difficulty">How important is this task on a scale of 1 to 10?</label>
        <input
            type="text"
            name="difficulty"
            id="difficulty"
            value={Task.difficulty}
            onChange={handleChange} />

        <label htmlFor="stress_rating">How stressed is this task making you feel on a scale of 1 to 10?</label>
        <input
            type="text"
            name="stress_rating"
            id="stress_rating"
            value={Task.stress_rating}
            onChange={handleChange} />  

        <input type="button" value="Add New Task" onClick={submitForm} />
        </form>
    );
}

export default Form;

//     function submitForm() {
//         props.handleSubmit(Task);
//         setTask({name: '', description: ''});
//     }
// // Adding functionality for question support~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     return (
//         <form>
//         <label htmlFor="name">Task Name</label>
//         <input
//             type="text"
//             name="name"
//             id="name"
//             value={Task.name}
//             onChange={handleChange} />
//         <label htmlFor="description">Task Description</label>
//         <input
//             type="text"
//             name="description"
//             id="description"
//             value={Task.description}
//             onChange={handleChange} />
//         <label htmlFor="name">How many days is the task due in/when would you like to have this done?</label>
//         <input
//             type="text"
//             name="name"
//             id="name"
//             value={Task.name}
//             onChange={handleChange} />  

//         <label htmlFor="name">How important is this task on a scale of 1 to 10?</label>
//         <input
//             type="text"
//             name="name"
//             id="name"
//             value={Task.name}
//             onChange={handleChange} />

//         <label htmlFor="name">How stressed is this task making you feel on a scale of 1 to 10?</label>
//         <input
//             type="text"
//             name="name"
//             id="name"
//             value={Task.name}
//             onChange={handleChange} />  
        


//         <input type="button" value="Add New Task" onClick={submitForm} />
//         </form>
//     );
// }

// export default Form;
