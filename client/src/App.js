import { useState, useEffect } from 'react';
import './App.css';
import  Axios from "axios";


function App() {

  const port = 3001;
  const [listOfUsers, setListOfUsers] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:${port}/getUsers`)
      .then((response) => {
        setListOfUsers(response.data);
      })
  }, [])

  const createUser = () => {
    Axios.post(`http://localhost:${port}/createUser`, {
      name, 
      age,
      username,    
    })
      .then((response) => {
        // console.log(response.data);
        setListOfUsers([...listOfUsers, {name, age, username}]);
      });
  };

  return (
    <div className="App">      
      <div className="usersDisplay">
        {listOfUsers.map(({name, age, username}) => {
          return (
            <div>
              <h1>Name: {name}</h1>
              <h1>Age: {age}</h1>
              <h1>Username: {username}</h1>
            </div>
          );
        })}
      <div>

        <input 
          type="text" 
          placeholder="Name..." 
          onChange={(e) => {setName(e.target.value);
          }} />

        <input 
          type="number" 
          placeholder="Age..."
          onChange={(e) => {setAge(e.target.value);
          }} />

        <input 
          type="text" 
          placeholder="Username..."
          onChange={(e) => {setUsername(e.target.value);
        }} />
        
        <button onClick={createUser}>Create</button>
      </div>
      
      </div> 
    </div>
  );
}

export default App;
