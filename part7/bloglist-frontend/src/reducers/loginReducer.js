import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const loginSlice = createSlice({
    name: 'login',

    initialState: null,
    reducers: {
        setLogginedUser(state, action) {

            return action.payload
        }
    },
})



export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setLogginedUser(user))
            blogService.setToken(user.token)
        }
    }
}



export const { setLogginedUser } = loginSlice.actions

export default loginSlice.reducer