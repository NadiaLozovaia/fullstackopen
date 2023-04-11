import { useState } from 'react'

const Names = (name) => {
  <p> {name}  </p>
}
const NameLine = ({name}) =>{
  return(
  <tr>
  <td>{name} </td> 
  
  </tr>
)
  }
const App = () => {
  const [name, setName] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const addName = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    const noteObject = {
      content: newName,
      // important: Math.random() < 0.5,
      // id: name.length + 1,
    }
    console.log(noteObject)
    setName(name.concat(noteObject))
    console.log(name)
    setNewName('')
    
  }
  
const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit"
          >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      
    </div>
    <table>
    <tbody>
      <nameLine name = {name}/> 
      
    </tbody>
    </table>
      
      
    </div>
  )
}

export default App