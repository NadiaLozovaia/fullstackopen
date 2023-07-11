
// import { useState } from 'react'

import { Table } from 'react-bootstrap'
import { updateBlogOf, deleteBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import Comments from './Comments'



const Blog = ({ blog, user, info }) => {
    const dispatch = useDispatch()

    // const [visible, setVisible] = useState(false)
    // const showWhenVisible = { display: visible ? '' : 'none' }
    // const toggleVisibility = () => {
    //     setVisible(!visible)
    // }
    // const lable = visible
    //     ? 'hide'
    //     : 'view'

    const handleLike = async () => {
        try {
            await dispatch(updateBlogOf(blog))
            dispatch(createNotification({
                type: 'info',
                message: `You liked '${blog.title}'`
            }, 5))
        }
        catch (error) {
            dispatch(createNotification({
                type: 'error',
                message: error.message
            }, 5))
        }
    }
    const handleDelete = async () => {
        try {
            await dispatch(deleteBlog(blog))
            dispatch(createNotification({
                type: 'info',
                message: `You deleted '${blog.title}'`
            }, 5))
        }
        catch (error) {
            dispatch(createNotification({
                type: 'error',
                message: error.message
            }, 5))
        }
    }

    if (!blog) {
        return null
    }

    if (info) {
        return (
            <div>

                <h2>{blog.title}</h2>

                <a href={blog.url}>{blog.url}</a>
                <p id='likes'>Likes {blog.likes} <button onClick={handleLike}>Like</button> </p>
                <p>{blog.author}</p>
                <p>created by {blog.user.name}</p>

                {user === blog.user.username &&
                    <div>
                        <button onClick={handleDelete}>Remove</button>
                    </div>
                }

            </div>

        )
    }


    return (

        <div className='blog'>

            <div className='blogTitle'>

                <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
                {/* <button onClick={toggleVisibility}>{lable}</button> */}

            </div>

            {/* <div className='blogInfo'
                style={showWhenVisible}>

                <p> {blog.url}</p>
                <p id='likes'>Likes {blog.likes} <button onClick={handleLike}>Like</button> </p>
                <p>{blog.author}</p>
                <p>created by {blog.user.name}</p>

                {user === blog.user.username &&
                    <div>
                        <button onClick={handleDelete}>Remove</button>
                    </div>
                }
            </div> */}
        </div>
    )


}

const Blogs = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => {

        return state.login
    })

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const blogs = useSelector(state => {
        return state.blog
    })
    const id = useParams().id


    if (id) {
        const blog = blogs.find(blog => blog.id === id)

        return (
            <div>
                <Blog key={id} blog={blog} user={user.username} info={true} />
                <CommentForm id={id} />
                <Comments id={id} />
            </div>
        )
    }

    return (
        <div>
            <Table striped>
                <tbody>
                    {blogs.map(blog =>
                        <tr key={blog.id} >
                            <td>
                                <Blog blog={blog} user={user.username} info={false} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div >

    )
}

export default Blogs





