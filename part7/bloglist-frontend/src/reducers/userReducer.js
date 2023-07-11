import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'


const usersSlice = createSlice({
    name: 'users',

    initialState: [],
    reducers: {


        appendUser(state, action) {

            state.push(action.payload)
        },

        setUsers(state, action) {

            return action.payload
        },

        removeUser(state, action) {
            const id = action.payload

            return state.filter(state => state.id !== id)
        }
    },
})



export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()

        dispatch(setUsers(users))
    }
}


// export const createBlog = (blogObject, user) => {
//     return async dispatch => {
//         const newBlog = await blogService.create(blogObject)
//         newBlog.user = {
//             name: user.name,
//             username: user.username
//         }
//         dispatch(appendBlog(newBlog))
//     }

// }
// export const deleteBlog = blog => {
//     return async dispatch => {
//         const id = blog.id
//         if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
//             await blogService.remove(id)
//             dispatch(removeBlog(id))
//         }

//     }
// }

// export const updateBlogOf = blog => {
//     const id = blog.id
//     const likesObject =
//     {
//         likes: blog.likes + 1
//     }
//     return async dispatch => {
//         const updatedBlog = await blogService.update(id, likesObject)
//         dispatch(likeBlogOf(updatedBlog))
//     }

// }

export const { appendUser, setUsers, removeUser } = usersSlice.actions

export default usersSlice.reducer