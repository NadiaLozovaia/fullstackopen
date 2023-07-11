
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

import { useField } from '../hooks'

const BlogForm = () => {

    const dispatch = useDispatch()
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')
    const user = useSelector(state => {
        return state.login
    })



    const addBlog = async (blogObject) => {
        try {
            await dispatch(createBlog(blogObject, user))
            dispatch(createNotification({
                type: 'info',
                message: `Added '${blogObject.title}'`
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
        addBlog({
            title: title.value,
            author: author.value,
            url: url.value,

        })
        title.reset()
        author.reset()
        url.reset()
    }

    return (
        <div>

            <h2>login</h2>



            <h4>create new</h4>
            <Form onSubmit={handleCreate}>
                <Form.Group>
                    <Form.Label>
                        Title
                    </Form.Label>
                    <Form.Control
                        type={title.type}
                        value={title.value}
                        onChange={title.onChange}
                    />


                    <Form.Label>
                        Author
                    </Form.Label>
                    <Form.Control
                        type={author.type}
                        value={author.value}
                        onChange={author.onChange}
                    />

                    <Form.Label>
                        Url
                    </Form.Label>
                    <Form.Control
                        type={url.type}
                        value={url.value}
                        onChange={url.onChange}
                    />


                    <Button variant="primary" type="submit">
                        create
                    </Button>
                </Form.Group>
            </Form>

        </div>
    )

}
export default BlogForm