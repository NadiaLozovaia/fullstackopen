import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'



const App = () => {

    const [blogs, setBlogs] = useState([])

    // const [maxLikes, setmaxLikes] = useState(null)

    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getBlogs = async () => {
            const blogs = await blogService.getAll()

            blogs.sort((min, max) => max.likes - min.likes)
            setBlogs(blogs)
            

        }
        getBlogs()

    }, [])



    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const blogFormRef = useRef()


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
            setErrorMessage(
                {
                    type: 'error',
                    message: 'Wrong credentials'
                }
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    const handleUnLogin = async (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        setUsername('')
        setPassword('')
    }

    const addLike = async (id, likesObject) => {

        const updatedBlog = await blogService.update(id, likesObject)
        const newBlogSet = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)

        newBlogSet.sort((min, max) => max.likes - min.likes)
        setBlogs(newBlogSet)

        setErrorMessage(
            {
                type: 'info',
                message: `You liked '${updatedBlog.title}'`
            }
        )
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const deletedBlog = async (id, blog) => {
        console.log(id)
        if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {

            try {
                await blogService.remove(id)

                setBlogs(blogs.filter(blog => blog.id !== id))

                setErrorMessage(
                    {
                        type: 'info',
                        message: `You deleted '${blog.title}'`
                    }
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            } catch (exception) {
                setErrorMessage(
                    {
                        type: 'error',
                        message: 'You do not have permission to delete'
                    }
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            }
        }
    }


    const addBlog = async (blogObject) => {

        const returnedBlog = await blogService.create(blogObject)
        returnedBlog.user = {
            name: user.name,
            username: user.username
        }

        setBlogs(blogs.concat(returnedBlog))
        console.log(returnedBlog)
        blogFormRef.current.toggleVisibility()

        setErrorMessage(
            {
                type: 'info',
                message: `Added '${returnedBlog.title}'`
            }
        )
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }




    const logoutButton = () => (
        <form onSubmit={handleUnLogin}>
            <button type="submit">logout</button>
        </form>
    )

    return (
        <div>
            <h2>Blogs</h2>

            <Notification notification={errorMessage} />

            {!user &&
                <div>
                    <p>Log in to application</p>
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                </div>}

            {user &&
                <div>
                    <div>{user.name} logged in {logoutButton()}</div>

                    <h2>create new</h2>
                    <Togglable buttonLabel="new blog" buttonLabelCancel='cancel' ref={blogFormRef} >
                        <BlogForm
                            createBlog={addBlog}
                        />
                    </Togglable>

                    <br></br>

                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} likedBlog={addLike} deletedBlog={deletedBlog} user={user.username} />

                    )}
                </div>
            }

        </div>
    )
}

export default App