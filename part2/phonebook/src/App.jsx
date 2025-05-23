import { useState, useEffect } from 'react'
import axios from 'axios'
import personServices from '../src/services/persons'
import './App.css'

const FilterNames = ({ onChange }) => {
  return (
    <div>
      filter shown with <input onChange={onChange} />

    </div>
  )
}

const PersonForm = ({ handleSubmit, handleNameChange, handleNumberChange, newName, newNumber }) => {
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
          <p key={person.id}>
            {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
          </p>
        ))}
      </div>
    )
  }
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
        </p>
      ))}
    </div>
  )
}

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState()
  const [notification, setNotification] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const filteredPersons = persons.filter((item) => item?.name?.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilter(filteredPersons)
  }

  const handleUpdateName = (currentPerson) => {
    const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

    if (confirmation) {
      const id = currentPerson.id

      personServices
        .updateName(id, { name: newName, number: newNumber })
        .then((updatedPerson) => {
          setPersons(persons.map((person) => person.id === id ? updatedPerson : person))

          setTimeout(() => {
            setNotification(
              {
                message: `Person succesfuflly updated`,
                type: 'success'
              }
            )
          }, 1000)

          new Promise(resolve => setTimeout(resolve, 5000))
            .then(() => {
              setNotification(null)
            })
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          if (error.status == 404) {
          setTimeout(() => {
            setNotification(
              {
                message: 'Person not found',
                type: 'error'
              }
            )
          }, 1000)

          new Promise(resolve => setTimeout(resolve, 5000))
            .then(() => {
              setNotification(null)
            })
          }
          else {
            setTimeout(() => {
              setNotification(
                {
                  message: 'An error has ocurred',
                  type: 'error'
                }
              )
            }, 1000)
  
            new Promise(resolve => setTimeout(resolve, 5000))
              .then(() => {
                setNotification(null)
              })
          }
        })
  
    }
  }
const handleSubmit = (event) => {
  event.preventDefault()
  const currentPerson = persons.find((person => person.name === newName))

  if (currentPerson) {
    handleUpdateName(currentPerson)
    return
  }

  personServices
    .addPerson(newName, newNumber)
    .then((response) => {
      setPersons(persons.concat(response.data))

      setTimeout(() => {
        setNotification(
          {
            message: `Person succesfuflly added`,
            type: 'success'
          }
        )
      }, 1000)

      new Promise(resolve => setTimeout(resolve, 5000))
        .then(() => {
          setNotification(null)
        })

    })

  setNewName('')
  setNewNumber('')
}

const handleDelete = (id) => {
  const confirmation = window.confirm('Are you sure?')
  if (confirmation) {
    const changedPersons = persons.filter((person) => person.id !== id)


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
    <FilterNames onChange={handleFilterChange} />
    <h2>add a new</h2>
    <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
    <Notification notification={notification} />
    <h2>Numbers</h2>
    <Persons persons={persons} filter={filter} handleDelete={handleDelete} />

  </div>
)
}

export default App