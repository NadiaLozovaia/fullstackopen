import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdoteOf } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div >
            {anecdote.content}
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {

        if (state.filter === '') { return state.anecdote }
        else
            return state.anecdote.filter(anecdote => {
                return anecdote.content.includes(state.filter)
            })

   
    })




    return (
        <div>
            {anecdotes.map(anecdote =>

                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() =>
                       { dispatch(updateAnecdoteOf(anecdote))  
                        dispatch(createNotification(`You voted '${anecdote.content}'`, 5))
                    }
                  
                        
                    }
                />
            )}
        </div>
    )
}

export default AnecdoteList