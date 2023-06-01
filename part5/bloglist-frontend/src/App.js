import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'




const App = () => {

  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthtor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleUnLogin = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }


  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const noteObject = {
        title: newTitle,
        author: newAuthtor,
        url: newUrl

      }

      const returnedBlog = await blogService.create(noteObject)

      setBlogs(blogs.concat(returnedBlog))

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

      setErrorMessage(`Added '${returnedBlog.title}'`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      console.log('Ups')
    }
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const unLoginButton = () => (
    <form onSubmit={handleUnLogin}>
      <button type="submit">logout</button>
    </form>
  )


  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Blog: <input
          value={newTitle}
          name="Title"
          // onChange={handleTitleChange} 
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <br />
      <div>
        Author: <input
          value={newAuthtor}
          name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <br />
      <div>
        URL: <input
          value={newUrl}
          name="URL"
          onChange={({ target }) => setNewUrl(target.value)} />
      </div>
      <br />
      <div></div>

      <button type="submit">create</button>
    </form>
  )


  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={errorMessage} />

      {!user && <div>
        <p>Log in to application</p>
        {loginForm()}
      </div>}

      {user && <div>
        <p>{user.name} logged in {unLoginButton()}</p>
        <h2>create new</h2>
        {blogForm()}
        <br></br>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }

    </div>
  )
}

export default App