import { useNotificationValue} from "../NotificationContext"

const Notification = () => {

  const notification = useNotificationValue()



  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }



  return (
    <div>
      {notification &&
        <div>
          <div style={style}>{notification} </div>
        </div>
      }
      {!notification &&
        <div></div>
      }

    </div>

  )
}

export default Notification
