import { useState } from 'react'
import { useMutation,  } from '@apollo/client'
import { ADD_BOOK,  ALL_AUTHORS } from '../queries'

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK,

    { 
      refetchQueries: [  {query: ALL_AUTHORS} ],
      
      onError: (error) => {
        const messages = error.graphQLErrors[0].message

        setError(messages)
      },
   
      update: (cache, response) => {
        console.log(cache, response.data.addBook, 'new book')   
        // updateCache(cache, { query: ALL_BOOKS, variables: { genres: null } }, response.data.addBook) 

      }}
  )

 
  const submit = async (event) => {
    event.preventDefault()

    const publishedInt = parseInt(published)
  
    addBook({ variables: { title, author: author, published: publishedInt, genres } })

    console.log('add book...')
 
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook