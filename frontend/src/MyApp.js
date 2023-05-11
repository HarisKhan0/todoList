import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() {
  const [characters, setCharacters] = useState([]);  

  function removeOneCharacter (index) {
    const deletedUser = characters.find((character, i) => {
      return i === index
    });

    makeDeleteCall(deletedUser._id).then( result => {
      if (result && result.status === 204){
        const updated = characters.filter((character, i) => {
          return i !== index
        });
        setCharacters(updated);
      }
    });
  }

  function updateList(person) { 
    makePostCall(person).then( result => {
      if (result && result.status === 201)
        setCharacters([...characters, result.data] );
    });
  }

  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:8000/users');
       return response.data.task_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }

  useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
  }, [] );

  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:8000/users', person);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

  async function makeDeleteCall(_id){
    try {
       const response = await axios.delete(`http://localhost:8000/users/${_id}`);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;
