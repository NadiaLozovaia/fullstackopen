import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
    name: 'blogs',

    initialState: [],
    reducers: {

        likeBlogOf(state, action) {
            const id = action.payload.id
            const blogToVote = state.find(b => b.id === id)
            const changedBlog = {
                ...blogToVote,
                likes: blogToVote.likes + 1
            }
            return state.map(blog =>
                blog.id !== id ? blog : changedBlog
            ).sort((min, max) => max.likes - min.likes)
        },
        appendBlog(state, action) {

            state.push(action.payload)
        },

        setBlogs(state, action) {

            return action.payload
        },



        removeBlog(state, action) {
            const id = action.payload

            return state.filter(state => state.id !== id)
        }
    },
})



export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        blogs.sort((min, max) => max.likes - min.likes)
        dispatch(setBlogs(blogs))
    }
}


export const createBlog = (blogObject, user) => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObject)
        newBlog.user = {
            name: user.name,
            username: user.username
        }
        dispatch(appendBlog(newBlog))
    }

}
export const deleteBlog = blog => {
    return async dispatch => {
        const id = blog.id
        if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
            await blogService.remove(id)
            dispatch(removeBlog(id))
        }

    }
}

export const updateBlogOf = blog => {
    const id = blog.id
    const likesObject =
    {
        likes: blog.likes + 1
    }
    return async dispatch => {
        const updatedBlog = await blogService.update(id, likesObject)
        dispatch(likeBlogOf(updatedBlog))
    }

}

export const { likeBlogsOf, appendBlog, setBlogs, removeBlog, likeBlogOf } = blogSlice.actions

export default blogSlice.reducer