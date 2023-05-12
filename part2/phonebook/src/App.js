import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import personService from './services/persons'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  if (notification.type === 'info')
    return (
      <div className='info'>
        {notification.message}
      </div>
    )
  else return (
    <div className='error'>
      {notification.message}
    </div>
  )
}

const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <form onSubmit={(event) => { event.preventDefault() }}>
      <div>
        filter shown with: <input
          value={filterValue}
          onChange={handleFilterChange} />
      </div>
    </form>
  )
}

const PersonForm = ({ newNameValue, newNumberValue, handleNameChange, handleNumberChange, addPersonFunction }) => {
  return (

    <form onSubmit={addPersonFunction}>
      <div>
        name: <input
          value={newNameValue}
          onChange={handleNameChange} />
      </div>
      <br />
      <div>
        number: <input
          value={newNumberValue}
          onChange={handleNumberChange} />
      </div>
      <br />
      <div>
        <button type="submit">
          add</button>
      </div>
    </form>

  )
}

const Persons = ({ personsValue, newFilterValue, deletePerson }) => {

  const personsToShow = personsValue.filter(person => {
    return person.name.includes(newFilterValue)
  })
  return (
    <ul>
      {personsToShow.map(person =>
        <div key={person.id} >
          <li>{person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)}>delete</button> </li>
        </div>
      )}
    </ul>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const result = persons.some(element => element.name === newName)

    if (result === false) {

      const personObject = {
        name: newName,
        number: newNumber,
        id: uuidv4(),
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setInfoMessage(
            {
              type: 'info',
              message: `Added '${newName}'`
            }
          )
          setTimeout(() => {
            setInfoMessage(null)
          }, 3000)
        })
        .catch(error => {
          const errorMessage = error.response.data.error

          setInfoMessage(
            {
              type: 'error',
              message: errorMessage
            }
          )
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)

        })

    }
    else {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with the new one?`)) {

        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        const id = person.id
        personService
          .update(id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response))
            setNewName('')
            setNewNumber('')
            setInfoMessage(
              {
                type: 'info',
                message: `Changed '${newName}'`
              }
            )
            setTimeout(() => {
              setInfoMessage(null)
            }, 3000)


          })
          .catch(error => {

            setInfoMessage(
              {
                type: 'error',
                message: `'${newName} ' was already removed from server`
              }
            )
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))

          })
        setNewName('')
        setNewNumber('')
      }
    }

  }
  const deletePersonOf = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      console.log('deletePerson', id)
      personService
        .personDelete(id)

        .then(_ => {
          console.log('promise fulfilled')
          setPersons(persons.filter(person => person.id !== id))
        })

    }
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={infoMessage} />

      <Filter filterValue={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        newNameValue={newName}
        newNumberValue={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPersonFunction={addPerson} />

      <h3>Numbers</h3>

      <Persons personsValue={persons} newFilterValue={newFilter}
        deletePerson={deletePersonOf} />

    </div>
  )
}

export default App