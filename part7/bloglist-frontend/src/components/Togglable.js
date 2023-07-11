import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        // console.log(ref, visible)
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                {props.viewed}
                <Button variant="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>

            <div style={showWhenVisible} className="togglableContent">
                {props.children}
                <Button variant="light" onClick={toggleVisibility}>{props.buttonLabelCancel}</Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    buttonLabelCancel: PropTypes.string.isRequired
}
export default Togglable