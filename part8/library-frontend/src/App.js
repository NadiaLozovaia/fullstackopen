import { useState, useEffect } from 'react'
import {  useApolloClient, useSubscription } from '@apollo/client'
import {  ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import FavoriteBooks from './components/FavoriteBooks'
import {
  
  Routes, Route,
} from 'react-router-dom'


const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

export const updateCache = (cache, query, addedBook) => {
  console.log(query)
  const uniqByName = (a) => {
    console.log(a)
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  if (cache.readQuery(query) === null) {
    return
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}
const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setToken(token)
  }, [token]) // eslint-disable-line

  useSubscription(BOOK_ADDED, {
 
    onData: ({ data, client }) => {
      console.log(data, 'app')
      
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)
      const genresAddedBook = addedBook.genres

      updateCache(client.cache, { query: ALL_BOOKS, variables: { genres: null } }, addedBook)

      
      genresAddedBook.map((g) =>
        updateCache(client.cache, { query: ALL_BOOKS, variables: { genres: g } }, addedBook))
      // console.log(client.cache.readQuery({ query: ALL_GENRES }))
      if (client.cache.readQuery({ query: ALL_GENRES }) !== null) {
        client.cache.updateQuery({ query: ALL_GENRES }, ({ allGenres }) => {
          console.log(allGenres, 'allGenres')
          const onlyUnique = (value, index, array) => {
            return array.indexOf(value) === index
          }
          return {
            allGenres: allGenres.concat(addedBook.genres).filter(onlyUnique)
          }


        })
    
      }
    
    }
  })


  return (
    <div>
      <Menu token={token} logout={logout} />
      <Notify errorMessage={errorMessage} />
      <Routes>
        <Route path="/" element={<Authors setError={notify} />} />
        <Route path="/books" element={<Books setError={notify} />} />
        <Route path="/add" element={<NewBook setError={notify} />} />
        <Route path="/recomend" element={<FavoriteBooks setError={notify} />} />
        <Route path="/login" element={<LoginForm setToken={setToken} setError={notify} />} />

      </Routes>

    </div>
  )
}

export default App
