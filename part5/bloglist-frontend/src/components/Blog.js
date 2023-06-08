import { useState } from 'react'

const Blog = ({ blog, likedBlog, deletedBlog, user }) => {

    const [visible, setVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)


    const showWhenVisible = { display: visible ? '' : 'none' }


    const toggleVisibility = () => {
        setVisible(!visible)
    }
    const lable = visible
        ? 'hide'
        : 'view'

    const handleLike = () => {
        let copyLikes = likes
        copyLikes += 1

        setLikes(copyLikes)
        const likesObject = {
            likes: copyLikes
        }
        likedBlog(blog.id, likesObject)
    }

    const handleDelete = () => {
        deletedBlog(blog.id, blog)

    }


    return (
        <div className='blog'>

            <div className='blogTitle'>
                {blog.title}
                <button onClick={toggleVisibility}>{lable}</button>
            </div>

            <div className='blogInfo'
                style={showWhenVisible}>


                <p> {blog.url}</p>
                <p id='likes'>Likes {likes} <button onClick={handleLike}>Like</button> </p>
                <p>{blog.author}</p>
                <p>created by {blog.user.name}</p>
                
                {user===blog.user.username&&
                <div>
                    <button onClick={handleDelete}>Remove</button>
                </div>
                }
            </div>
        </div>
    )

}
export default Blog