import { useState} from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ALL_GENRES} from '../queries'

const BookFilter = ({ setGenre }) => {

  const resultGenres = useQuery(ALL_GENRES)
 
  if (resultGenres.loading) {
   
    return <div>loading...</div>
  }

  const genres = resultGenres.data.allGenres
  const filterByGenre = (genre) => {
    setGenre(genre)
    console.log(genre)
  }

  return (
    <>
    <button onClick={() => filterByGenre(null)} >All genres</button>
      {genres.map((g) =>
        <button onClick={() => filterByGenre(g)} key={g}>{g}</button>
      )}
    </>
  )
}

const Books = ({setError}) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, { variables: { genres: genre } },)

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks || []


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      < BookFilter setGenre={setGenre} />
    </div>
  )
}

export default Books
