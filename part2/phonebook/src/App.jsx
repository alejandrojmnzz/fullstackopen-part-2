import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
    const names = persons.concat({name: newName, number: newNumber})
    setNewName('')
    setPersons(names)
  }
  return (
    <div>
      <h2>Phonebook</h2>
       filter shown with <input onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          filter ? filter.map((person) => (
            <li key={person.name}>{person.name} {person.number}</li>
          )) :
        persons.map((person) => (
          <li key={person.name}>{person.name} {person.number}</li>
        ))
        }
      </ul>
      
    </div>
  )
}

export default App