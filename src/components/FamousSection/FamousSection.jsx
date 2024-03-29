import React, { useState, useEffect } from 'react';
import './FamousSection.css';
import axios from 'axios';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function
  useEffect(() => {
    //console.log('IN useEffect');
    fetchPeople();
  }, []);
    
  const fetchPeople = () => {
    // TODO: fetch the list of people from the server
    axios({
      method: 'GET',
      url: '/api/people'
    })
    .then((response) => {
      setPeopleArray(response.data);
    })
    .catch((error) => {
      console.error(error)
    });
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    const newPerson = {name: famousPersonName, role: famousPersonRole};
    // TODO: create POST request to add this new person to the database
    axios({
      method: 'POST',
      url: '/api/people',
      data: newPerson
    })
    .then((response) => {
      fetchPeople()
    })
    .catch((error) => {
      console.error(error);
    })
    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property

    document.querySelector('#name-input').value = '';
    document.querySelector('#role-input').value = '';

  }

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" onChange={e => setPersonName(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          <input id="role-input" onChange={e => setPersonRole(e.target.value)} />
          <button type="submit">Done</button>
        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>
        <ul>
          {/* TODO: Render the list of famous people */}
          {famousPeopleArray.map(personData => {
              return <li key={personData.id}> {personData.name}: Known For - {personData.role}</li>
          })}
        </ul>
      </section>
    );

}
export default FamousSection;
