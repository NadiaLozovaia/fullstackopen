import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'




const anecdoteSlice = createSlice({
  name: 'anecdotes',

  initialState: [],
  reducers: {

    voteAnecdoteOf(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      console.log(JSON.parse(JSON.stringify(state)))

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      ).sort((min, max) => max.votes - min.votes)
    },
    appendAnecdote(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      return action.payload
    }
  },
})



export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}


export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }

}

export const updateAnecdoteOf = anecdote => {
  const id = anecdote.id

  const newObject =
  {
    content: anecdote.content,
    votes: anecdote.votes + 1
  }
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, newObject)
    dispatch(voteAnecdoteOf(updatedAnecdote))
  }

}


export const { voteAnecdoteOf, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer