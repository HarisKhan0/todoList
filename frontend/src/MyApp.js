import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import TaskList from "./TaskList";
import CredentialList from "./CredentialList";
import Form from "./Form";
import Login from "./Login";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:8000/tasks");
      return response.data.task_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person) {
    try {
      const response = await axios.post("http://localhost:8000/tasks", person);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makeDeleteCall(_id) {
    try {
      const response = await axios.delete(`http://localhost:8000/tasks/${_id}`);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function removeOneCharacter(index) {
    const deletedTask = characters.find((character, i) => i === index);

    makeDeleteCall(deletedTask._id).then((result) => {
      if (result && result.status === 204) {
        const updated = characters.filter((character, i) => i !== index);
        setCharacters(updated);
      }
    });
  }

  function updateList(person) {
    makePostCall(person).then((result) => {
      if (result && result.status === 201) {
        setCharacters([...characters, result.data]);
      }
    });
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        setCharacters(result);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login handleSubmit={updateList} />}></Route>
          <Route
            path="/TaskList"
            element={
              <TaskList
                characterData={characters}
                removeCharacter={removeOneCharacter}
              />
            }
          ></Route>
          <Route
            path="/CredentialList"
            element={
              <CredentialList
                characterData={characters}
                removeCharacter={removeOneCharacter}
              />
            }
          ></Route>
          <Route
            path="/form"
            element={<Form handleSubmit={updateList} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default MyApp;
