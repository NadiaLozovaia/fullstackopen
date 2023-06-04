import { useState } from 'react'


const BlogForm = ({ createBlog }) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthtor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')


    const addBlog = async (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthtor,
            url: newUrl
        })

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')

    }


    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    Blog: <input
                        value={newTitle}
                        name="Title"
                        //   onChange={({ target }) => setNewTitle(target.value)}
                        onChange={event => setNewTitle(event.target.value)}
                    //   onChange={handleTitleChange}
                    />
                </div>
                <br />
                <div>
                    Author: <input
                        value={newAuthtor}
                        name="Author"
                        //   onChange={({ target }) => setNewAuthor(target.value)}
                        onChange={event => setNewAuthor(event.target.value)}
                    // onChange={handleAuthorChange}
                    />
                </div>
                <br />
                <div>
                    URL: <input
                        value={newUrl}
                        name="URL"
                        //   onChange={({ target }) => setNewUrl(target.value)}
                        // onChange={handleUrlChange}
                        onChange={event => setNewUrl(event.target.value)}
                    />
                </div>
                <br />
                <div></div>

                <button type="submit">create</button>
            </form>
        </div>
    )
}
export default BlogForm