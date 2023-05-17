import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    name: "",
    job: "",
    newInput2: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "name") {
      setPerson({
        ...person,
        name: value,
      });
    } else if (name === "job") {
      setPerson({
        ...person,
        job: value,
      });
    } else if (name === "newInput2") {
      setPerson({
        ...person,
        newInput2: value,
      });
    }
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ name: "", job: "", newInput2: "" });
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
      <label htmlFor="newInput2">NewInput2</label>
      <input
        type="text"
        name="newInput2"
        id="newInput2"
        value={person.newInput2}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default Form;
