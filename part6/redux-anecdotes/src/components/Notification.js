import { useSelector } from 'react-redux'


const Notification = () => {

  const notification = useSelector(state => {
    console.log(JSON.parse(JSON.stringify(state)), 'notification')
    return state.notification
  }
  )


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
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