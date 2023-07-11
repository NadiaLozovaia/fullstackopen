
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useField } from '../hooks'

import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { setLogginedUser } from '../reducers/loginReducer'

const LoginForm = () => {

    const username = useField('text')
    const password = useField('text')
    const dispatch = useDispatch()


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value, password: password.value,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            dispatch(setLogginedUser(user))

        } catch (exception) {
            dispatch(createNotification({
                type: 'error',
                message: 'Wrong credentials'
            }, 5))

        }
    }



    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    username

                    <input
                        type={username.type}
                        value={username.value}
                        onChange={username.onChange}
                    />

                </div>
                <div>
                    password
                    <input
                        type={password.type}
                        value={password.value}
                        onChange={password.onChange}
                    />

                </div>
                <button  type="submit">login</button>

            </form>
        </div>
    )
}



export default LoginForm