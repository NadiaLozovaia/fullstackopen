import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'


const Users = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    const users = useSelector(state => {
        return state.users
    })


    return (
        <div>
            <h3>Users</h3>
            <div>
                <table>
                    <tbody>
                        <tr><th>User name</th><th>Blogs created</th></tr>

                        {users.map(user =>
                            <tr key={user.id}><td >
                                <Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>

                        )}
                    </tbody>
                </table>
            </div>
        </div>

    )
}




export default Users

