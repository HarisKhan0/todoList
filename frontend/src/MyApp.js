import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import TaskList from "./TaskList";
import CredentialList from "./CredentialList";
import Form from "./Form";
import Login from "./Login";
import Wview from "./wview";

function MyApp() {
  const [tasks, setTasks] = useState([]);
  const [credentials, setCredentials] = useState([]);
  let currentUser = "Current Filler User"; // TODO

  // Getting all tasks through backend
  async function fetchAllTasks() {
    try {
      const response = await axios.get("http://localhost:8000/tasks");
      const tasks = response.data.task_list;
      const filteredTasks = tasks.filter((task) => task.user === currentUser);
      return filteredTasks;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  // added function to indicate complete if a task is complete
  function toggleComplete(index) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          complete: !task.complete, // Toggle the complete value
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function updateUrgency(updatedTasks) {
    setTasks(updatedTasks);
  }

  // Getting all credentials through backend
  async function fetchAllCredentials() {
    try {
      const response = await axios.get("http://localhost:8000/credentials");
      return response.data.credential_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Adding a task through backend
  async function makeTaskPostCall(task) {
    try {
      const response = await axios.post("http://localhost:8000/tasks", task);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Adding a credential through backend
  async function makeCredentialPostCall(credential) {
    try {
      const response = await axios.post(
        "http://localhost:8000/credentials",
        credential
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Delete a task through backend
  async function makeTaskDeleteCall(_id) {
    try {
      const response = await axios.delete(`http://localhost:8000/tasks/${_id}`);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Delete a credential through backend
  async function makeCredentialDeleteCall(_id) {
    try {
      const response = await axios.delete(
        `http://localhost:8000/credentials/${_id}`
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Remove task at the given index
  function removeOneTask(index) {
    const deletedTask = tasks.find((task, i) => i === index);

    makeTaskDeleteCall(deletedTask._id).then((result) => {
      if (result && result.status === 204) {
        const updated = tasks.filter((task, i) => i !== index);
        setTasks(updated);
      }
    });
  }

  // Remove credential at the given index
  function removeOneCredential(index) {
    const deletedCredential = credentials.find((task, i) => i === index);

    makeCredentialDeleteCall(deletedCredential._id).then((result) => {
      if (result && result.status === 204) {
        const updated = credentials.filter((task, i) => i !== index);
        setCredentials(updated);
      }
    });
  }

  // Stores a task
  function updateTaskList(task) {
    makeTaskPostCall(task).then((result) => {
      if (result && result.status === 201) {
        setTasks([...tasks, result.data]);
      }
    });
  }

  // Stores a credential
  function updateCredentialList(credential) {
    makeCredentialPostCall(credential).then((result) => {
      if (result && result.status === 201) {
        setCredentials([...credentials, result.data]);
      }
    });
  }

  // Checks if login credentials is valid
  async function isCredentialValid(credentialToCheck) {
    try {
      const credentials = await fetchAllCredentials();

      if (!credentials) {
        return false;
      }

      console.log(credentials);

      const isValid = credentials.some((credential) => {
        return (
          credential.username === credentialToCheck.username &&
          credential.password === credentialToCheck.password
        );
      });

      return isValid;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //  TODO store new credentials
  // this will take in credentials, using those credentials, fetch the id
  async function storeCredential(credentialToStore) {
    try {
      if (isCredentialValid(credentialToStore)) {
        const userId = credentials
          .filter(
            (credential) => credential.username === credentialToStore.username
          )
          .map((credential) => credential.username);
        console.log("UserId: " + userId);
        currentUser = userId; // TODO
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    // Updating tasks
    fetchAllTasks().then((result) => {
      if (result) {
        setTasks(result);
      }
    });

    // Updating Credentials
    fetchAllCredentials().then((result) => {
      if (result) {
        setCredentials(result);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Login
                handleSubmitCredential={updateCredentialList}
                isCredentialValid={isCredentialValid}
                storeCredential={storeCredential}
              />
            }
            s
          ></Route>
          <Route
            path="/TaskList"
            element={
              <TaskList
                taskData={tasks}
                removeTask={removeOneTask}
                toggleComplete={toggleComplete}
                updateUrgency={updateUrgency}
              />
            }
          ></Route>
          <Route
            path="/CredentialList"
            element={
              <CredentialList
                credentialData={credentials}
                removeCredential={removeOneCredential}
              />
            }
          ></Route>
          <Route
            path="/form"
            element={<Form handleSubmitTask={updateTaskList} />}
          ></Route>
          <Route path="/wview" element={<Wview />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default MyApp;
