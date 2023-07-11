

import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/commentReducer'
import { createNotification } from '../reducers/notificationReducer'

import { useField } from '../hooks'

const CommentForm = ({ id }) => {

    const dispatch = useDispatch()
    const comment = useField('text')


    const addComment = async (id, commentObject) => {
        try {
            await dispatch(createComment(id, commentObject))
            dispatch(createNotification({
                type: 'info',
                message: `Added '${commentObject.comment}'`
            }, 5))

        }
        catch (error) {
            dispatch(createNotification({
                type: 'error',
                message: error.message
            }, 5))
        }
    }
    const handleCreate = (event) => {
        event.preventDefault()
        addComment(id, {
            comment: comment.value,

        })
        comment.reset()

    }

    return (
        <div>
            <h4>Give a comment</h4>
            <form onSubmit={handleCreate}>
                <div>
                    Comment
                    <input
                        type={comment.type}
                        value={comment.value}
                        onChange={comment.onChange}
                    />

                </div>


                <button>add comment</button>
            </form>

        </div>
    )

}
export default CommentForm