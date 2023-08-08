import { Link } from 'react-router-dom'



const Menu = ({ token, logout }) => {

    const padding = {
        paddingRight: 5
    }

    if (!token) {
        return (
            <div>
                <Link style={padding} to="/"><button>authors</button></Link>
                <Link style={padding} to="/books"><button>books</button></Link>
                <Link style={padding} to="/login"><button>login</button></Link>

            </div>
        )
    }

    return (
        <div>
            <Link style={padding} to="/"><button>authors</button></Link>
            <Link style={padding} to="/books"><button>books</button></Link>
            <Link style={padding} to="/add"><button>add</button></Link>
            <Link style={padding} to="/recomend"><button>recomend</button></Link>
            <button onClick={logout}>logout</button>
        </div>
    )

}
export default Menu