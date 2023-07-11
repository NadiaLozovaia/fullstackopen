import { useSelector } from 'react-redux'

const Notification = () => {

    const notification = useSelector(state => {

        return state.notification
    }
    )

    if (notification === null) {
        return null
    }
    if (notification.type === 'info')
        return (
            <div className='info'>
                {notification.message}
            </div>
        )
    else return (
        <div className='error'>
            {notification.message}
        </div>
    )
}

export default Notification