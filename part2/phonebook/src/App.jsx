import { useState, useEffect } from 'react'
import axios from 'axios'
import personServices from '../src/services/persons'

const FilterNames = ({onChange}) => {
  return (
    <div>
      filter shown with <input onChange={onChange} />

    </div>
  )
}

const PersonForm = ({ handleSubmit, handleNameChange, handleNumberChange, newName, newNumber}) => {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ persons, filter, handleDelete }) => {
  if (filter) {
    return (
      <div>
        {filter.map((person) => (
          <p key={person.name}>
            {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
          </p>
        ))}
      </div>
    )
  }
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
        </p>
      ))}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState()

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const filteredPersons = persons.filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilter(filteredPersons)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.filter((person => person.name === newName)).length > 0) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    personServices
    .addPerson(newName, newNumber)
    .then((response) => {
      setPersons(persons.concat(response.data))
    })

    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
    const changedPersons = persons.filter((person) => person.id !== id)
    console.log(id)

    if (changedPersons.length === persons.length) {
      alert('the note does not exists')
      return
    }

    personServices
      .deletePerson(id)
      .then(() => {
        setPersons(changedPersons)
      })
  }

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then((response) => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterNames onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>

    </div>
  )
}

export default App