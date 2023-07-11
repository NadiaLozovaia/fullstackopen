import { configureStore } from '@reduxjs/toolkit'


import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'
const store = configureStore({
    reducer: {
        blog: blogReducer,
        login: loginReducer,
        notification: notificationReducer,
        users: userReducer,
        comments: commentReducer
    }
})

export default store