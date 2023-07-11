import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const commentSlice = createSlice({
    name: 'comments',

    initialState: [],
    reducers: {
        setComments(state, action) {

            return action.payload
        },

        appendComment(state, action) {

            state.push(action.payload)

        },
    }
})



export const createComment = (id, commentObject) => {
    return async dispatch => {

        const newComment = await blogService.comment(id, commentObject)
        newComment.blog = {
            id: id
        }
        dispatch(appendComment(newComment))
    }

}

export const initializeComments = (id) => {
    return async dispatch => {
        const comments = await blogService.getComments(id)
        console.log(comments)
        dispatch(setComments(comments))
    }
}
export const { setComments, appendComment } = commentSlice.actions

export default commentSlice.reducer