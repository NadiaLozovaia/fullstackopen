import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'
const App = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (upAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')

      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id === upAnecdote.id ? upAnecdote : anecdote))
      dispatch({
        type: 'MESSAGE',
        playload: 
        `Anecdote: ${upAnecdote.content} voted`
      })
      setTimeout(() => {
        dispatch({ type: 'DEFAULT' })
       }, 5000)
      
    },
   
  })
  const handleVote = (anecdote) => {
 
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })

  }

  const result = useQuery('anecdotes', getAnecdotes, { refetchOnWindowFocus: false, retry: false })
  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>anecdotes server not available due to problems in server </div>
  }
  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
