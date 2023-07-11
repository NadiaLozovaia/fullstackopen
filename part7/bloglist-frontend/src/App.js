import {  Button } from 'react-bootstrap'




import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { initializeUser, setLogginedUser } from './reducers/loginReducer'

import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Menu from './components/Menu'

import {
    Routes,
    Route,
} from 'react-router-dom'


const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUser())
    }, [dispatch])
    const loginedUser = useSelector(state => {
        return state.login
    })

    const handleLogout = async (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setLogginedUser(null))
    }
    const logoutButton = () => (
        <form onSubmit={handleLogout}>
            <Button variant="link">logout</Button>
            {/* <button type="submit">logout</button> */}
        </form>
    )
    const blogFormRef = useRef()


    return (
        <div className="container">

            <Notification />
            {!loginedUser &&

                <div>
                    <h2>Blogs app</h2>
                    <p>Log in to application</p>
                    <LoginForm />
                </div>}
            {loginedUser &&
                <div>
                    <Menu loginedUserForMenu={loginedUser.name} logoutButtonForMenu={logoutButton()} />

                    <h2>Blogs app</h2>
                    <Routes>
                        <Route path="/users/:id" element={<User />} />
                        <Route path="/blogs/:id" element={<Blogs />} />
                        <Route path="/" element={
                            <div>
                                <Togglable buttonLabel="new blog" buttonLabelCancel='cancel' ref={blogFormRef} >
                                    <BlogForm />
                                </Togglable>
                                <Blogs />
                            </div>
                        }
                        />
                        <Route path="/users" element={<Users />} />
                    </Routes>
                </div>
            }

        </div>
    )
}

export default App