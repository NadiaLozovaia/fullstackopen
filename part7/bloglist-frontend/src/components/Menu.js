import { Link } from 'react-router-dom'


import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


const Menu = ({ loginedUserForMenu, logoutButtonForMenu }) => {
    const padding = {
        paddingRight: 5
    }








    return (
        <div>
            <Navbar bg="light" data-bs-theme="light">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/">blogs</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/users">users</Link>
                        </Nav.Link>


                        <Navbar.Text>
                            Signed in as:  {loginedUserForMenu}
                        </Navbar.Text>

                        {logoutButtonForMenu}

                    </Nav>
                </Navbar.Collapse>
            </Navbar >

        </div>
    )
}
export default Menu