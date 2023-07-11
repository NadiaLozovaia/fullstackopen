

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {

    const users = useSelector(state => {
        return state.users
    })

    const id = useParams().id

    const user = users.find(u => u.id === id)

    if (!user) {
        return null
    }


    return (

        <div>
            <h3> {user.name}</h3>
            <h3>Added blogs</h3>
            <ul>
                {user.blogs.map(blog =>

                    <li key={blog.id}>
                        {blog.title}
                    </li>
                )}
            </ul>
        </div>

    )

}

export default User