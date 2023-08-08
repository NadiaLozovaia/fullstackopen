import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR} from '../queries'

const AuthorForm = ({ setError, authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [editAuthor, result] = useMutation(EDIT_AUTHOR)

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('author not found')
    }
  }, [result.data]) // eslint-disable-line 

  const options = authors.map(a => (
    {
      value: a.name,
      label: a.name
    }))
  

  const submit = async (event) => {
    event.preventDefault()
    const yearInt = parseInt(year)
    editAuthor({ variables: { name:selectedOption.value, born: yearInt } })
    console.log('edit author...')
    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
     
      <form onSubmit={submit}>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
        {/* <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <div>
          born <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>set year</button>
      </form>
    </div>
  )
}

export default AuthorForm