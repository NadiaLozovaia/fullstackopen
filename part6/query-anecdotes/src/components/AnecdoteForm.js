import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'


const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote,
    {
      onSuccess: (newAnecdote) => {
      
        const anecdotes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))

        dispatch({
          type: 'MESSAGE',
          playload: 
          `New anecdote added: ${newAnecdote.content}`
        })
      
        setTimeout(() => {
         dispatch({ type: 'DEFAULT' })
        }, 5000)
      },
      onError: (error) => {dispatch({
        type: 'MESSAGE',
        playload: error.response.data.error
      })

      setTimeout(() => {
       dispatch({ type: 'DEFAULT' })
      }, 5000)
      }

    })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })    
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
