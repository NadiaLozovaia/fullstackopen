import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeComments } from '../reducers/commentReducer'


const Comments = ({ id }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeComments(id))
    }, [dispatch])

    const comments = useSelector(state => {
        return state.comments
    })

    return (

        <div>
            <h4>Comments</h4>


            {!comments.length &&
                <div>
                    no comments yet
                </div>
            }
            <ul>
                {comments &&
                    comments.map(comment =>
                        <li key={comment.id}>
                            {comment.comment}
                        </li>
                    )
                }
            </ul>
        </div >

    )

}

export default Comments